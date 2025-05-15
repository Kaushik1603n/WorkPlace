import mongoose from "mongoose";

const ClientProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    profilePic: { type: String },
    CoverPic: { type: String },
    companyName: { type: String },
    location: { type: String },
    website: { type: String },
    description: { type: String },
    totalJobsPosted: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("ClientProfile", ClientProfileSchema);
