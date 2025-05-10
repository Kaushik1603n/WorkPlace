import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", SkillSchema);
