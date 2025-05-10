import mongoose from "mongoose";

const MilestoneSchema = new mongoose.Schema(
  {
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "approved", "disputed"],
      default: "pending",
    },
    dueDate: { type: Date },
    completionDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Milestone", MilestoneSchema);
