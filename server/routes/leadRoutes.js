import express from "express";
import {
  createLead,
  getLeads,
  addMeeting,
  getMeetings,
} from "../controllers/leadController.js";

const router = express.Router();

router.post("/", createLead);
router.get("/", getLeads);
router.post("/:id/meetings", addMeeting);
router.get("/:id/meetings", getMeetings);

export default router;
