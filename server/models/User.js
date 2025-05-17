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

UserSchema.virtual("jobs", {
  ref: "Job",               // 👈 The model to use
  localField: "_id",        // 👈 The User field (primary key)
  foreignField: "clientId", // 👈 The Job field that references User
});
UserSchema.virtual("profile", {
  ref: "FreelancerProfile",               // 👈 The model to use
  localField: "_id",        // 👈 The User field (primary key)
  foreignField: "userId", // 👈 The Job field that references User
});
UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });


export default mongoose.model("User", UserSchema);
