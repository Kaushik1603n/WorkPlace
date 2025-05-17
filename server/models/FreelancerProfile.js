import mongoose from "mongoose";

const FreelancerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    headline: { type: String },
    bio: { type: String },
    profilePic: { type: String },
    CoverPic: { type: String },
    skills: {
      type: [String], // Array of strings
      default: [],
    },
    hourlyRate: { type: Number },
    location: { type: String },
    availability: {
      type: String,
      enum: ["full-time", "part-time", "not-available"],
    },
    experienceLevel: {
      type: String,
      enum: ["entry", "intermediate", "expert"],
    },
    education: { type: String },
    languages: [
      {
        language: String,
        proficiency: String,
      },
    ],
    reference: { type: String },
    rating: { type: Number, default: 0 },
    totalJobs: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("FreelancerProfile", FreelancerProfileSchema);
