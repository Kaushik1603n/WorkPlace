import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["freelancer", "client", "admin"],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    otp: { type: Number },
    otpExpiry: { type: Date },
    refreshToken:{type: String},
    socialLogins: [
      {
        provider: { type: String, enum: ["google", "facebook", "github"] },
        providerId: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
