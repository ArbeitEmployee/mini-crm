// server/routes/meetingRoutes.js
import express from "express";
import { createMeeting, getMeetingsByLead } from "../controllers/meetingController.js";

const router = express.Router();

router.post("/", createMeeting); // POST /api/meetings
router.get("/:leadId", getMeetingsByLead); // GET /api/meetings/:leadId

export default router;
