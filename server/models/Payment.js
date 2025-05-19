import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
    },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    freelancerId: {
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
    milestoneId: { type: String }, // If payment is for a specific milestone

    escrowReleaseDate: { type: Date },
    payoutDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
