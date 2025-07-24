// server/controllers/meetingController.js
import Meeting from "../models/Meeting.js";

export const createMeeting = async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: "Failed to save meeting", error });
  }
};

export const getMeetingsByLead = async (req, res) => {
  try {
    const { leadId } = req.params;
    const meetings = await Meeting.find({ leadId }).sort({ date: -1 });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching meetings" });
  }
};
