import mongoose from "mongoose";

const CalendarEventSchema = new mongoose.Schema(
  {
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    type: {
      type: String,
      enum: ["interview", "meeting", "availability"],
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    meetingLink: { type: String },
    reminders: [
      {
        method: String,
        timeBefore: Number,
        sent: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("CalendarEvent", CalendarEventSchema);
