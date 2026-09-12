import { NextResponse } from "next/server";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

import connect from "@/lib/db";
import Transaction from "@/lib/models/transaction";
import User from "@/lib/models/user";

/*
|--------------------------------------------------------------------------
| Email transporter
|--------------------------------------------------------------------------
*/

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function money(value, currency = "USD") {
  return `${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}`;
}

/**
 * Find a receiving customer.
 *
 * Priority:
 * 1. transaction.account
 * 2. transaction.beneficiary if it looks like an account number
 * 3. beneficiary as email
 */
async function findReceiver(transaction, session) {
  let receiver = null;

  // First try account number.
  if (transaction.account) {
    receiver = await User.findOne({
      accountNumber: String(transaction.account).trim(),
    }).session(session);
  }

  // Try beneficiary name.
  if (!receiver && transaction.beneficiary) {
    receiver = await User.findOne({
      fullname: String(transaction.beneficiary).trim(),
    }).session(session);
  }

  return receiver;
}

/*
|--------------------------------------------------------------------------
| Email templates
|--------------------------------------------------------------------------
*/

function transactionEmailTemplate({
  title,
  userName,
  transaction,
  receiver = null,
}) {
  const currency = transaction.currency || "USD";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0" />

  <title>${title}</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f4f7fb;
    font-family:Arial,Helvetica,sans-serif;
  "
>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="padding:40px 15px;"
  >

    <tr>
      <td align="center">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            max-width:600px;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
            box-shadow:0 10px 30px rgba(0,0,0,0.08);
          "
        >

          <!-- Header -->

          <tr>
            <td
              style="
                background:#e30613;
                padding:30px;
                text-align:center;
              "
            >

              <h1
                style="
                  color:#ffffff;
                  margin:0;
                  font-size:25px;
                "
              >
                ${process.env.BANK_NAME || "Ziraat Bank"}
              </h1>

              <p
                style="
                  color:#cbd5e1;
                  margin:8px 0 0;
                  font-size:14px;
                "
              >
                Secure Banking
              </p>

            </td>
          </tr>

          <!-- Content -->

          <tr>
            <td style="padding:35px 30px;">

              <h2
                style="
                  color:#111827;
                  margin:0 0 15px;
                  font-size:22px;
                "
              >
                ${title}
              </h2>

              <p
                style="
                  color:#4b5563;
                  line-height:1.7;
                  font-size:15px;
                "
              >
                Dear ${userName || "Customer"},
              </p>

              <p
                style="
                  color:#4b5563;
                  line-height:1.7;
                  font-size:15px;
                "
              >
                Your transaction has been successfully processed.
                Below are the transaction details.
              </p>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  margin-top:25px;
                  border:1px solid #e5e7eb;
                  border-radius:12px;
                  overflow:hidden;
                "
              >

                <tr>
                  <td
                    style="
                      padding:12px;
                      background:#f8fafc;
                      color:#64748b;
                    "
                  >
                    Transaction Type
                  </td>

                  <td
                    style="
                      padding:12px;
                      text-align:right;
                      font-weight:bold;
                    "
                  >
                    ${transaction.type}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;color:#64748b;">
                    Amount
                  </td>

                  <td
                    style="
                      padding:12px;
                      text-align:right;
                      font-weight:bold;
                    "
                  >
                    ${money(transaction.amount, currency)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;color:#64748b;">
                    Transaction ID
                  </td>

                  <td
                    style="
                      padding:12px;
                      text-align:right;
                    "
                  >
                    ${transaction.id}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;color:#64748b;">
                    Status
                  </td>

                  <td
                    style="
                      padding:12px;
                      text-align:right;
                      color:#15803d;
                      font-weight:bold;
                    "
                  >
                    Successful
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;color:#64748b;">
                    Date
                  </td>

                  <td
                    style="
                      padding:12px;
                      text-align:right;
                    "
                  >
                    ${transaction.date || transaction.createdAt || ""}
                  </td>
                </tr>

              </table>

              ${
                receiver
                  ? `
                  <div
                    style="
                      margin-top:20px;
                      padding:15px;
                      background:#f8fafc;
                      border-radius:10px;
                    "
                  >
                    <strong>Beneficiary</strong>

                    <p style="margin:7px 0;color:#475569;">
                      ${receiver.fullname || ""}
                    </p>

                    <p style="margin:7px 0;color:#475569;">
                      ${receiver.email || ""}
                    </p>

                    <p style="margin:7px 0;color:#475569;">
                      ${receiver.accountNumber || ""}
                    </p>
                  </div>
                  `
                  : ""
              }

              <p
                style="
                  margin-top:30px;
                  color:#64748b;
                  font-size:13px;
                  line-height:1.6;
                "
              >
                If you did not authorize this transaction,
                please contact your bank immediately.
              </p>

            </td>
          </tr>

          <!-- Footer -->

          <tr>
            <td
              style="
                padding:22px;
                background:#f8fafc;
                text-align:center;
                color:#94a3b8;
                font-size:12px;
              "
            >
              © ${new Date().getFullYear()}
              ${process.env.BANK_NAME || "Our Bank"}.
              All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>

  </table>

</body>
</html>
`;
}

/*
|--------------------------------------------------------------------------
| Send approval emails
|--------------------------------------------------------------------------
*/

async function sendApprovalEmails(transaction, sender, receiver) {
  const currency = transaction.currency || "USD";

  const emails = [];

  if (sender?.email) {
    emails.push({
      to: sender.email,
      subject: `Transaction Successful - ${transaction.id}`,
      html: transactionEmailTemplate({
        title: "Transaction Successful",
        userName: sender.fullname,
        transaction,
        receiver,
      }),
    });
  }

  // Do not send a second email if sender and receiver are the same user.
  if (
    receiver?.email &&
    receiver.email.toLowerCase() !== sender?.email?.toLowerCase()
  ) {
    emails.push({
      to: receiver.email,
      subject: `Incoming ${transaction.type} - ${transaction.id}`,
      html: transactionEmailTemplate({
        title: "Incoming Transaction",
        userName: receiver.fullname,
        transaction,
        receiver,
      }),
    });
  }

  await Promise.all(
    emails.map((email) =>
      transporter.sendMail({
        from:
          process.env.SMTP_FROM ||
          `"${process.env.BANK_NAME || "Our Bank"}" <${process.env.SMTP_USER}>`,
        to: email.to,
        subject: email.subject,
        html: email.html,
      })
    )
  );
}

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
|
| GET /api/admin/transactions
|
| Returns all transactions and user information.
|
*/

export async function GET() {
  try {
    await connect();

    const transactions = await Transaction.find({})
      .populate(
        "userId",
        "fullname email phone accountNumber balance available"
      )
      .sort({ createdAt: -1 })
      .lean();

    /*
     * Fetch receiver information separately because
     * account/beneficiary are strings rather than ObjectIds.
     */

    const formattedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        let receiver = null;

        if (transaction.account) {
          receiver = await User.findOne({
            accountNumber: transaction.account,
          })
            .select("fullname email phone accountNumber")
            .lean();
        }

        if (!receiver && transaction.beneficiary) {
          receiver = await User.findOne({
            email: String(transaction.beneficiary).toLowerCase(),
          })
            .select("fullname email phone accountNumber")
            .lean();
        }

        return {
          ...transaction,

          sender: transaction.userId
            ? {
                _id: transaction.userId._id,
                fullname: transaction.userId.fullname,
                email: transaction.userId.email,
                phone: transaction.userId.phone,
                accountNumber: transaction.userId.accountNumber,
                balance: transaction.userId.balance,
                available: transaction.userId.available,
              }
            : null,

          receiver: receiver
            ? {
                _id: receiver._id,
                fullname: receiver.fullname,
                email: receiver.email,
                phone: receiver.phone,
                accountNumber: receiver.accountNumber,
              }
            : null,
        };
      })
    );

    return NextResponse.json(
      {
        success: true,
        count: formattedTransactions.length,
        transactions: formattedTransactions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET TRANSACTIONS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch transactions",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/*
|--------------------------------------------------------------------------
| PATCH
|--------------------------------------------------------------------------
|
| Approve / unapprove transaction.
|
| Body:
|
| {
|   "transactionId": "...",
|   "action": "approve"
| }
|
| or
|
| {
|   "transactionId": "...",
|   "action": "unapprove"
| }
|
*/

export async function PATCH(request) {
  const session = await mongoose.startSession();

  try {
    await connect();

    const body = await request.json();

    const {
      transactionId,
      action,
    } = body;

    if (!transactionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction ID is required",
        },
        { status: 400 }
      );
    }

    if (!["approve", "unapprove"].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          message: "Action must be approve or unapprove",
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid transaction ID",
        },
        { status: 400 }
      );
    }

    let responseData = null;
    let shouldSendEmails = false;

    await session.withTransaction(async () => {
      /*
       * Always get the transaction inside the session.
       */
      const transaction = await Transaction.findById(transactionId)
        .session(session)
        .lean();

      if (!transaction) {
        throw new Error("TRANSACTION_NOT_FOUND");
      }

      const previousStatus = transaction.status;

      /*
       * ---------------------------------------------------------------
       * APPROVE
       * ---------------------------------------------------------------
       */

      if (action === "approve") {
        /*
         * Already successful.
         *
         * Do NOT modify balances again.
         */
        if (previousStatus === "Successful") {
          responseData = {
            transaction,
            message: "Transaction is already successful",
          };

          return;
        }

        if (!transaction.amount || Number(transaction.amount) <= 0) {
          throw new Error("INVALID_TRANSACTION_AMOUNT");
        }

        const amount = Number(transaction.amount);

        /*
         * Find sender / initiator.
         */
        const sender = await User.findById(transaction.userId)
          .session(session);

        if (!sender) {
          throw new Error("SENDER_NOT_FOUND");
        }

        /*
         * Find receiver.
         */
        let receiver = await findReceiver(transaction, session);

        /*
         * -----------------------------------------------------------
         * TRANSFER
         * -----------------------------------------------------------
         */

        if (transaction.type === "Transfer") {
          /*
           * A transfer needs a customer receiver.
           *
           * We do not deduct the sender if the receiver cannot
           * be found. This prevents customer money from disappearing.
           */
          if (!receiver) {
            throw new Error(
              "RECEIVER_NOT_FOUND_FOR_TRANSFER"
            );
          }

          if (
            String(sender._id) === String(receiver._id)
          ) {
            throw new Error(
              "SENDER_AND_RECEIVER_CANNOT_BE_THE_SAME"
            );
          }

          /*
           * Check available balance.
           */
          if (Number(sender.balance) < amount) {
            throw new Error("INSUFFICIENT_BALANCE");
          }

          /*
           * Deduct sender.
           */
          await User.updateOne(
            {
              _id: sender._id,
            },
            {
              $inc: {
                balance: -amount,
                available: -amount,
              },
            },
            {
              session,
            }
          );

          /*
           * Credit receiver.
           */
          await User.updateOne(
            {
              _id: receiver._id,
            },
            {
              $inc: {
                balance: amount,
                available: amount,
              },
            },
            {
              session,
            }
          );
        }

        /*
         * -----------------------------------------------------------
         * PAYMENT
         * -----------------------------------------------------------
         */

        else if (transaction.type === "Payment") {
          /*
           * Payment is treated as an outgoing payment.
           *
           * If a bank customer can be identified as the beneficiary,
           * credit that customer.
           */

          if (Number(sender.balance) < amount) {
            throw new Error("INSUFFICIENT_BALANCE");
          }

          await User.updateOne(
            {
              _id: sender._id,
            },
            {
              $inc: {
                balance: -amount,
                available: -amount,
              },
            },
            {
              session,
            }
          );

          if (
            receiver &&
            String(sender._id) !== String(receiver._id)
          ) {
            await User.updateOne(
              {
                _id: receiver._id,
              },
              {
                $inc: {
                  balance: amount,
                  available: amount,
                },
              },
              {
                session,
              }
            );
          }
        }

        /*
         * -----------------------------------------------------------
         * DEPOSIT
         * -----------------------------------------------------------
         */

        else if (transaction.type === "Deposit") {
          /*
           * A deposit credits the initiating customer's account.
           */

          await User.updateOne(
            {
              _id: receiver._id,
            },
            {
              $inc: {
                balance: amount,
                available: amount,
              },
            },
            {
              session,
            },
          );
        }

        /*
         * -----------------------------------------------------------
         * WITHDRAWAL
         * -----------------------------------------------------------
         */

        else if (transaction.type === "Withdrawal") {
          /*
           * A withdrawal deducts money from the initiating customer.
           */

          if (Number(receiver.balance) < amount) {
            throw new Error("INSUFFICIENT_BALANCE");
          }

          await User.updateOne(
            {
              _id: receiver._id,
            },
            {
              $inc: {
                balance: -amount,
                available: -amount,
              },
            },
            {
              session,
            }
          );
        }

        /*
         * Update transaction status AFTER balance operations.
         */

        await Transaction.updateOne(
          {
            _id: transaction._id,
          },
          {
            $set: {
              status: "Successful",
            },
          },
          {
            session,
          }
        );

        /*
         * Get the latest sender and receiver information
         * for the email.
         */
        const updatedSender = await User.findById(sender._id)
          .session(session)
          .lean();

        let updatedReceiver = null;

        if (receiver) {
          updatedReceiver = await User.findById(receiver._id)
            .session(session)
            .lean();
        }

        responseData = {
          transaction: {
            ...transaction,
            status: "Successful",
          },
          sender: updatedSender,
          receiver: updatedReceiver,
        };

        /*
         * Email should only be sent when the transaction actually
         * changes from a non-successful state to successful.
         */
        shouldSendEmails = true;
      }

      /*
       * ---------------------------------------------------------------
       * UNAPPROVE
       * ---------------------------------------------------------------
       */

      if (action === "unapprove") {
        /*
         * Nothing to reverse if it isn't currently successful.
         */
        if (previousStatus !== "Successful") {
          responseData = {
            transaction,
            message: "Transaction is already unapproved",
          };

          return;
        }

        const amount = Number(transaction.amount);

        if (!amount || amount <= 0) {
          throw new Error("INVALID_TRANSACTION_AMOUNT");
        }

        const sender = await User.findById(transaction.userId)
          .session(session);

        if (!sender) {
          throw new Error("SENDER_NOT_FOUND");
        }

        let receiver = await findReceiver(transaction, session);

        /*
         * -----------------------------------------------------------
         * REVERSE TRANSFER
         * -----------------------------------------------------------
         */

        if (transaction.type === "Transfer") {
          if (!receiver) {
            throw new Error(
              "RECEIVER_NOT_FOUND_FOR_REVERSAL"
            );
          }

          /*
           * Remove the money from receiver.
           */
          if (Number(receiver.balance) < amount) {
            throw new Error(
              "RECEIVER_HAS_INSUFFICIENT_BALANCE_FOR_REVERSAL"
            );
          }

          await User.updateOne(
            {
              _id: receiver._id,
            },
            {
              $inc: {
                balance: -amount,
                available: -amount,
              },
            },
            {
              session,
            }
          );

          /*
           * Return money to sender.
           */
          await User.updateOne(
            {
              _id: sender._id,
            },
            {
              $inc: {
                balance: amount,
                available: amount,
              },
            },
            {
              session,
            }
          );
        }

        /*
         * -----------------------------------------------------------
         * REVERSE PAYMENT
         * -----------------------------------------------------------
         */

        else if (transaction.type === "Payment") {
          /*
           * Return payment amount to sender.
           */
          await User.updateOne(
            {
              _id: sender._id,
            },
            {
              $inc: {
                balance: amount,
                available: amount,
              },
            },
            {
              session,
            }
          );

          /*
           * If payment had a bank receiver,
           * remove the credited amount.
           */
          if (
            receiver &&
            String(receiver._id) !== String(sender._id)
          ) {
            if (Number(receiver.balance) < amount) {
              throw new Error(
                "RECEIVER_HAS_INSUFFICIENT_BALANCE_FOR_REVERSAL"
              );
            }

            await User.updateOne(
              {
                _id: receiver._id,
              },
              {
                $inc: {
                  balance: -amount,
                  available: -amount,
                },
              },
              {
                session,
              }
            );
          }
        }

        /*
         * -----------------------------------------------------------
         * REVERSE DEPOSIT
         * -----------------------------------------------------------
         */

        else if (transaction.type === "Deposit") {
          if (Number(receiver.balance) < amount) {
            throw new Error(
              "INSUFFICIENT_BALANCE_FOR_DEPOSIT_REVERSAL"
            );
          }

          await User.updateOne(
            {
              _id: receiver._id,
            },
            {
              $inc: {
                balance: -amount,
                available: -amount,
              },
            },
            {
              session,
            }
          );
        }

        /*
         * -----------------------------------------------------------
         * REVERSE WITHDRAWAL
         * -----------------------------------------------------------
         */

        else if (transaction.type === "Withdrawal") {
          /*
           * Return withdrawn money to customer's account.
           */
          await User.updateOne(
            {
              _id: receiver._id,
            },
            {
              $inc: {
                balance: amount,
                available: amount,
              },
            },
            {
              session,
            },
          );
        }

        /*
         * Change Successful back to Pending.
         */
        await Transaction.updateOne(
          {
            _id: transaction._id,
          },
          {
            $set: {
              status: "Pending",
            },
          },
          {
            session,
          }
        );

        responseData = {
          transaction: {
            ...transaction,
            status: "Pending",
          },
          message: "Transaction successfully unapproved",
        };
      }
    });

    /*
     * Commit has completed successfully at this point.
     *
     * Send email AFTER the MongoDB transaction commits.
     *
     * This prevents sending a successful email if the database
     * transaction subsequently fails.
     */

    if (shouldSendEmails && responseData) {
      try {
        await sendApprovalEmails(
          responseData.transaction,
          responseData.sender,
          responseData.receiver
        );
      } catch (emailError) {
        /*
         * Do not undo the financial transaction because an email
         * provider temporarily failed.
         */
        console.error(
          "TRANSACTION EMAIL ERROR:",
          emailError
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          action === "approve"
            ? "Transaction approved successfully"
            : "Transaction unapproved successfully",
        data: responseData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("PATCH TRANSACTION ERROR:", error);
    console.log("Error: ", error);

    let message = "Failed to update transaction";
    let status = 500;

    switch (error.message) {
      case "TRANSACTION_NOT_FOUND":
        message = "Transaction not found";
        status = 404;
        break;

      case "SENDER_NOT_FOUND":
        message = "Transaction initiator/customer was not found";
        status = 404;
        break;

      case "RECEIVER_NOT_FOUND_FOR_TRANSFER":
        message =
          "The transfer receiver could not be found. The transaction was not approved.";
        status = 400;
        break;

      case "RECEIVER_NOT_FOUND_FOR_REVERSAL":
        message =
          "The transfer receiver could not be found, so the transaction cannot be reversed safely.";
        status = 400;
        break;

      case "INSUFFICIENT_BALANCE":
        message =
          "The transaction initiator does not have sufficient balance";
        status = 400;
        break;

      case "INVALID_TRANSACTION_AMOUNT":
        message = "Invalid transaction amount";
        status = 400;
        break;

      case "SENDER_AND_RECEIVER_CANNOT_BE_THE_SAME":
        message =
          "The sender and receiver cannot be the same customer";
        status = 400;
        break;

      case "RECEIVER_HAS_INSUFFICIENT_BALANCE_FOR_REVERSAL":
        message =
          "The receiver does not have enough balance to safely reverse this transaction";
        status = 400;
        break;

      case "INSUFFICIENT_BALANCE_FOR_DEPOSIT_REVERSAL":
        message =
          "The customer does not have enough balance to reverse this deposit";
        status = 400;
        break;
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status,
      }
    );
  } finally {
    await session.endSession();
  }
}

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
|
| DELETE /api/admin/transactions
|
| Body:
|
| {
|   "transactionId": "..."
| }
|
*/

export async function DELETE(request) {
  const session = await mongoose.startSession();

  try {
    await connect();

    const body = await request.json();

    const { transactionId } = body;

    if (!transactionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction ID is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid transaction ID",
        },
        {
          status: 400,
        }
      );
    }

    let deletedTransaction = null;

    await session.withTransaction(async () => {
      const transaction = await Transaction.findById(
        transactionId
      )
        .session(session)
        .lean();

      if (!transaction) {
        throw new Error("TRANSACTION_NOT_FOUND");
      }

      /*
       * IMPORTANT:
       *
       * A successful transaction has already changed customer
       * balances.
       *
       * Therefore we do NOT silently delete a successful
       * transaction. The admin must first unapprove it so that
       * the financial operation is reversed.
       */

      if (transaction.status === "Successful") {
        throw new Error(
          "SUCCESSFUL_TRANSACTION_MUST_BE_UNAPPROVED_FIRST"
        );
      }

      await Transaction.deleteOne(
        {
          _id: transaction._id,
        },
        {
          session,
        }
      );

      deletedTransaction = transaction;
    });

    return NextResponse.json(
      {
        success: true,
        message: "Transaction deleted successfully",
        transaction: deletedTransaction,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE TRANSACTION ERROR:", error);

    let message = "Failed to delete transaction";
    let status = 500;

    if (error.message === "TRANSACTION_NOT_FOUND") {
      message = "Transaction not found";
      status = 404;
    }

    if (
      error.message ===
      "SUCCESSFUL_TRANSACTION_MUST_BE_UNAPPROVED_FIRST"
    ) {
      message =
        "Successful transactions cannot be deleted directly. Unapprove the transaction first so the balance changes can be reversed.";
      status = 400;
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status,
      }
    );
  } finally {
    await session.endSession();
  }
}