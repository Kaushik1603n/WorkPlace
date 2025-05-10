import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
    },
    milestoneId: { type: mongoose.Schema.Types.ObjectId, ref: "Milestone" },
    payerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    fee: { type: Number },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "refunded"],
      default: "pending",
    },
    escrowReleaseDate: { type: Date },
    payoutDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
