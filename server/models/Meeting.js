// server/models/Meeting.js
import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    deal: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Successful", "Failed"],
      default: "Pending",
    },
    notes: String,
  },
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;
