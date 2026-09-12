import mongoose from "mongoose";
import User from "./user";

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Deposit", "Withdrawal", "Payment", "Transfer"],
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    direction: {
      type: String,
      enum: ["out", "in"],
    },
    account: {
      type: String,
    },
    bank: {
      type: String,
    },
    beneficiary: {
      type: String,
    },
    description: {
      type: String,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Successful", "Failed"],
      default: "Pending",
    },
    time: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
