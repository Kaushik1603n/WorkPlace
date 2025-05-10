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
    PortfolioAttachments: [{ type: String }],
    milestones: [
      {
        title: String,
        description: String,
        amount: Number,
        dueDate: Date,
      },
    ],
    status: {
      type: String,
      enum: ["submitted", "interviewing", "rejected", "accepted"],
      default: "submitted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", ProposalSchema);
