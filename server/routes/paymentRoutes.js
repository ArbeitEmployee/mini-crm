import express from "express";
import {
  createPayment,
  getAllPayments,
  markInstallmentPaid,
  getPaymentPlanById,
} from "../controllers/paymentController.js";

const router = express.Router();

// Specific route must come before the general "/"
router.get("/:id", getPaymentPlanById);

router.post("/", createPayment);
router.get("/", getAllPayments);
router.patch("/:paymentId/installments/:installmentId", markInstallmentPaid);

export default router;
