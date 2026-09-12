import { NextResponse } from "next/server";
import Transaction from "@/lib/models/transaction";
import connect from "@/lib/db";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "@/lib/models/user";

export async function GET(request) {
  try {
    await connect();

    // ==========================================
    // 1. GET JWT FROM COOKIE
    // ==========================================

    const cookieStore = await cookies();

    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. No authentication token found.",
        },
        { status: 401 },
      );
    }

    // ==========================================
    // 2. VERIFY JWT
    // ==========================================

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired authentication token.",
        },
        { status: 401 },
      );
    }

    // ==========================================
    // 3. GET CURRENT USER ID FROM JWT
    // ==========================================

    const loggedInUserId = decoded.id;

    if (!loggedInUserId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid authentication token.",
        },
        { status: 401 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(loggedInUserId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user ID.",
        },
        { status: 400 },
      );
    }

    // ==========================================
    // 4. GET CURRENT LOGGED-IN USER
    // ==========================================

    const currentUser = await User.findById(loggedInUserId)
      .select("_id fullname accountNumber")
      .lean();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User account not found.",
        },
        { status: 404 },
      );
    }

    // ==========================================
    // 5. GET userId FROM QUERY PARAMETER
    // ==========================================

    const { searchParams } = new URL(request.url);

    const queryUserId = searchParams.get("userId");

    // ==========================================
    // 6. BUILD TRANSACTION MATCH CONDITIONS
    // ==========================================

    const orConditions = [];

    /*
     * A. Transactions created by the userId
     * supplied in the query parameter.
     *
     * Example:
     * /api/transactions?userId=68abc...
     */

    if (queryUserId && mongoose.Types.ObjectId.isValid(queryUserId)) {
      orConditions.push({
        userId: new mongoose.Types.ObjectId(queryUserId),
      });
    }

    /*
     * B. Transactions created by the
     * currently logged-in user.
     */

    orConditions.push({
      userId: currentUser._id,
    });

    /*
     * C. Transactions involving the current
     * user's account number.
     *
     * Example:
     *
     * Transaction:
     * account: "123456789"
     *
     * Current user:
     * accountNumber: "123456789"
     */

    if (currentUser.accountNumber) {
      orConditions.push({
        account: currentUser.accountNumber,
      });
    }

    /*
     * D. Transactions where the current user
     * is the beneficiary.
     */

    if (currentUser.fullname) {
      orConditions.push({
        beneficiary: currentUser.fullname,
      });
    }

    // ==========================================
    // 7. FETCH TRANSACTIONS
    // ==========================================

    const transactions = await Transaction.aggregate([
      {
        $match: {
          $or: orConditions,
        },
      },

      // ========================================
      // JOIN TRANSACTION USER
      // ========================================

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "transactionUser",
        },
      },

      {
        $unwind: {
          path: "$transactionUser",
          preserveNullAndEmptyArrays: true,
        },
      },

      // ========================================
      // RETURN ONLY REQUIRED FIELDS
      // ========================================

      {
        $project: {
          _id: 0,

          id: 1,
          date: 1,
          time: 1,
          type: 1,
          description: 1,
          beneficiary: 1,
          bank: 1,
          account: 1,
          amount: 1,
          currency: 1,
          status: 1,
          direction: 1,

          // Transaction creator
          userId: 1,

          // Creator information
          senderFullname: "$transactionUser.fullname",
          senderAccountNumber: "$transactionUser.accountNumber",

          createdAt: 1,
          updatedAt: 1,
        },
      },

      // ========================================
      // NEWEST TRANSACTIONS FIRST
      // ========================================

      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    // ==========================================
    // 8. REASSIGN THE VALUES OF THE RESPONSE
    // ==========================================

    transactions.map((transaction) => {
      if (
        transaction.account === currentUser.accountNumber &&
        transaction.beneficiary === currentUser.fullname && 
        transaction.type === "Transfer"
      ) {
        transaction.direction = "in";
      } else if (
        transaction.account === currentUser.accountNumber &&
        transaction.beneficiary === currentUser.fullname &&
        transaction.type === "Deposit"
      ) {
        transaction.direction = "in";
      } else {
        transaction.direction = "out";
      }
    });

     // ==========================================
      // 9. RETURN RESPONSE
      // ==========================================

    return NextResponse.json(
      {
        success: true,

        currentUser: {
          userId: currentUser._id,
          fullname: currentUser.fullname,
          accountNumber: currentUser.accountNumber,
        },

        count: transactions.length,

        transactions,
      },
      { status: 200 },
    );
    
  } catch (error) {
    console.error(
      "GET transactions error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch transactions.",
      },
      { status: 500 }
    );
  }
}