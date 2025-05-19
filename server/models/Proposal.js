import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema(
  {
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    coverLetter: { type: String, required: true },
    budgetType: { type: String, enum: ["fixed", "hourly"], required: true },
    bidAmount: { type: Number, required: true },
    estimatedTime: { type: Number },
    workSamples: { type: String },
    PortfolioAttachments: [{ type: String }],
    milestones: [
      {
        title: String,
        description: String,
        amount: Number,
        dueDate: Date,
        status: {
          type: String,
          enum: ["pending", "approved", "completed", "paid"],
          default: "pending",
        },
        paymentId: String,
      },
    ],
    status: {
      type: String,
      enum: [
        "submitted",
        "interviewing",
        "rejected",
        "accepted",
        "cancelled",
        "active",
        "completed",
      ],
      default: "submitted",
    },
    contractId: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", ProposalSchema);
