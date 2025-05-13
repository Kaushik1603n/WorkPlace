import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["freelancer", "client", "admin"],
    },
    isVerified: { type: Boolean, default: false },
    otp: { type: Number },
    otpExpiry: { type: Date },
    refreshToken: { type: String },
    googleId: { type: String, unique: true, sparse: true,},
    pic: { type: String },
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
