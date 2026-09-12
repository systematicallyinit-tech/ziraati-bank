import { NextResponse } from "next/server";
import Transaction from "@/lib/models/transaction";
import connect from "@/lib/db";

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const ObjectId = require("mongoose").Types.ObjectId;

    if (!userId) {
          return new NextResponse(
            JSON.stringify({
              message: "ID not found",
            }),
            { status: 400 }
          );
        }
        if (!ObjectId.isValid(userId)) {
          return new NextResponse(JSON.stringify({ message: "Invalid user ID" }), {
            status: 400,
          });
        }
        
  try {
    await connect();

    const body = await request.json();

    const {
      type,
      description,
      beneficiary,
      bank,
      account,
      amount,
      currency,
      status = "Pending",
    } = body;

    // Validate required fields
    if (!type || !description || !amount) {
      return NextResponse.json(
        {
          success: false,
          message: "type, description, amount and currency are required",
        },
        { status: 400 }
      );
    }

    // Get current date/time
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    // Example: 20260815
    const dateId = `${year}${month}${day}`;

    // Find the latest transaction created today
    const latestTransaction = await Transaction.findOne({
      id: new RegExp(`^TXN-${dateId}-`),
    })
      .sort({ id: -1 })
      .lean();

    let sequence = 1;

    if (latestTransaction && latestTransaction.id) {
      const lastSequence = Number(
        latestTransaction.id.split("-")[2]
      );

      if (!Number.isNaN(lastSequence)) {
        sequence = lastSequence + 1;
      }
    }

    // Generate transaction ID
    // Example: TXN-20260815-001
    const transactionId = `TXN-${dateId}-${String(sequence).padStart(
      3,
      "0"
    )}`;

    // Deposit = money coming in
    // Everything else = money going out
    const direction =
      type.toLowerCase() === "deposit" ? "in" : "out";

    // Format date
    // Example: 15 Aug 2026
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // Format time
    // Example: 03:18 PM
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Capitalize transaction type
    // deposit -> Deposit
    // withdrawal -> Withdrawal
    const formattedType =
      type.charAt(0).toUpperCase() +
      type.slice(1).toLowerCase();

    // Create transaction
    const transaction = await Transaction.create({
        userId,
      id: transactionId,
      date: formattedDate,
      time: formattedTime,
      type: formattedType,
      description,
      beneficiary,
      bank,
      account,
      amount,
      status,
      direction,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: transaction.id,
          date: transaction.date,
          time: transaction.time,
          type: transaction.type,
          description: transaction.description,
          beneficiary: transaction.beneficiary,
          bank: transaction.bank,
          account: transaction.account,
          amount: transaction.amount,
          status: transaction.status,
          direction: transaction.direction,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create transaction error:", error);

    // Duplicate transaction ID
    if (error && error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction ID already exists. Please try again.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create transaction",
      },
      { status: 500 }
    );
  }
}