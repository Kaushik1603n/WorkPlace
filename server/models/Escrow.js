import mongoose from "mongoose";

const EscrowSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: "Contract", required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalAmount: { type: Number, required: true },
  releasedAmount: { type: Number, default: 0 },
  heldAmount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["funded", "partial-release", "fully-released", "disputed", "refunded"],
    default: "funded"
  },
  releaseConditions: String, // Terms for fund release
  transactions: [{
    amount: Number,
    type: { type: String, enum: ["deposit", "release", "refund"] },
    date: { type: Date, default: Date.now },
    initiatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }
  }],
  disputeId: { type: mongoose.Schema.Types.ObjectId, ref: "Dispute" }
}, { timestamps: true });

export default mongoose.model("Escrow",EscrowSchema );
