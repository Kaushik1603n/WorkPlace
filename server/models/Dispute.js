import mongoose from "mongoose";

const DisputeSchema = new mongoose.Schema(
  {
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
    },
    milestoneId: { type: mongoose.Schema.Types.ObjectId, ref: "Milestone" },
    initiatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    againstId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "under-review", "resolved", "escalated"],
      default: "open",
    },
    resolution: { type: String },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    evidence: [
      {
        url: String,
        type: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Dispute", DisputeSchema);
