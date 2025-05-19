import mongoose from "mongoose";

const DisputeSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
    },
    escrowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Escrow",
      required: true,
    },
    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    against: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["raised", "under-review", "resolved", "cancelled"],
      default: "raised",
    },
    resolution: { type: String },
    resolutionDate: { type: String },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachments: [
      {
        url: String,
        type: String,
        description: String,
      },
    ],
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Dispute", DisputeSchema);
