import Payment from "../models/Payment.js";

// Utility function to generate installments
const generateInstallments = (totalAmount, numberOfInstallments, startDate, customInstallments = []) => {
  // If custom installments are provided and match the count, use them
  if (customInstallments.length === numberOfInstallments) {
    return customInstallments.map(inst => ({
      amount: inst.amount,
      dueDate: new Date(inst.dueDate),
      status: inst.status || "Unpaid",
      notes: inst.notes || ""
    }));
  }

  // Otherwise generate equal installments
  const amountPerInstallment = totalAmount / numberOfInstallments;
  const installments = [];

  for (let i = 0; i < numberOfInstallments; i++) {
    const dueDate = new Date(startDate);
    dueDate.setMonth(dueDate.getMonth() + i);

    installments.push({
      amount: amountPerInstallment,
      dueDate,
      status: "Unpaid",
      notes: ""
    });
  }

  return installments;
};

// ✅ Create a new payment plan
export const createPayment = async (req, res) => {
  const { name, email, totalAmount, numberOfInstallments, startDate, installments: customInstallments } = req.body;

  if (!name || !email || !totalAmount || !numberOfInstallments || !startDate) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const installments = generateInstallments(
      totalAmount, 
      numberOfInstallments, 
      startDate,
      customInstallments
    );

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
    installment.paidAt = new Date(); // Add this line to track when it was paid
    await payment.save();

    res.json(payment); // Return the updated payment object
  } catch (err) {
    res.status(500).json({ message: "Error updating installment", error: err.message });
  }
};



