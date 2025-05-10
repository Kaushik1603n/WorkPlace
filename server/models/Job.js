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
    RequiredFeatures: { type: String },
    stack: { type: String },
    skillsRequired: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    budgetType: { type: String, enum: ["fixed", "hourly"], required: true },
    budgetRange: {
      min: { type: Number },
      max: { type: Number },
    },
    duration: { type: String, enum: ["short-term", "long-term", "ongoing"] },
    experienceLevel: {
      type: String,
      enum: ["entry", "intermediate", "expert"],
    },
    status: {
      type: String,
      enum: ["draft", "posted", "in-progress", "completed", "cancelled"],
      default: "draft",
    },
    proposals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Proposal" }],
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    Reference: { type: String },
    Attachments: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
