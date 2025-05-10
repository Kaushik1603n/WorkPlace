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
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    hourlyRate: { type: Number },
    availability: {
      type: String,
      enum: ["full-time", "part-time", "not-available"],
    },
    experienceLevel: {
      type: String,
      enum: ["entry", "intermediate", "expert"],
    },
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number,
        description: String,
      },
    ],
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
