import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
  {
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "completed", "disputed", "terminated"],
      default: "active",
    },
    paymentMethod: { type: String },
    status: {
      type: String,
      enum: ["active", "completed", "terminated"],
      default: "active",
    },
    terms: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Contract", ContractSchema);
