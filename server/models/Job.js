import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredFeatures: { type: String },
    stack: { type: String },
    skills: {
      type: [String], 
      default: [],
    },
    budgetType: { type: String, enum: ["fixed", "hourly"], required: true },
    budget: {
      type: Number,
    },
    time: { type: String },
    experienceLevel: {
      type: String,
      enum: ["entry", "intermediate", "expert"],
    },
    status: {
      type: String,
      enum: ["draft", "posted", "in-progress", "completed", "cancelled"],
      default: "posted",
    },
    proposals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Proposal" }],
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    reference: { type: String },
    Attachments: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
