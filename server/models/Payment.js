import mongoose from "mongoose";

const installmentSchema = new mongoose.Schema({
  amount: Number,
  dueDate: Date,
  status: {
    type: String,
    enum: ["Paid", "Unpaid"],
    default: "Unpaid",
  },
  paidAt: Date,
  notes: String,
}, { _id: true }); // Make sure _id is generated for each installment

const paymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  totalAmount: Number,
  numberOfInstallments: Number,
  startDate: Date,
  installments: [installmentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
