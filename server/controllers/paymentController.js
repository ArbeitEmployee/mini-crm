import Payment from "../models/Payment.js";

// Utility function to generate installments
const generateInstallments = (totalAmount, numberOfInstallments, startDate) => {
  const amountPerInstallment = totalAmount / numberOfInstallments;
  const installments = [];

  for (let i = 0; i < numberOfInstallments; i++) {
    const dueDate = new Date(startDate);
    dueDate.setMonth(dueDate.getMonth() + i); // Next installment each month

    installments.push({
      amount: amountPerInstallment,
      dueDate,
      status: "Unpaid",
    });
  }

  return installments;
};

// ✅ Create a new payment plan
export const createPayment = async (req, res) => {
  const { name, email, totalAmount, numberOfInstallments, startDate } = req.body;

  if (!name || !email || !totalAmount || !numberOfInstallments || !startDate) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const installments = generateInstallments(totalAmount, numberOfInstallments, startDate);

    const payment = new Payment({
      name,
      email,
      totalAmount,
      numberOfInstallments,
      startDate,
      installments,
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    console.error("Create Payment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all payment plans
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

// ✅ Get a single payment plan by ID
export const getPaymentPlanById = async (req, res) => {
  try {
    const plan = await Payment.findById(req.params.id); // ✅ CORRECTED from PaymentPlan
    if (!plan) {
      return res.status(404).json({ message: "Payment plan not found" });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Mark a specific installment as paid
export const markInstallmentPaid = async (req, res) => {
  const { paymentId, installmentId } = req.params;

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    const installment = payment.installments.id(installmentId);
    if (!installment) return res.status(404).json({ message: "Installment not found" });

    installment.status = "Paid";
    await payment.save();

    res.json({ message: "Installment marked as paid" });
  } catch (err) {
    res.status(500).json({ message: "Error updating installment", error: err.message });
  }
};
