import Lead from "../models/lead.js"; 


// Create lead
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: "Create failed", error: err });
  }
};

// Get all leads
export const getLeads = async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
};

// Add meeting
export const addMeeting = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.meetings.push(req.body);
    await lead.save();
    res.status(200).json(lead.meetings);
  } catch (err) {
    res.status(500).json({ message: "Meeting add failed", error: err });
  }
};

// Get all meetings for one lead
export const getMeetings = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    res.json(lead.meetings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching meetings", error: err });
  }
};
