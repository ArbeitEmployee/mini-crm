import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  date: String,
  note: String,
  outcome: String,
});

const leadSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  status: String,
  meetings: [meetingSchema],


  totalDealValue: {
    type: Number,
    default: 0,
  },
  totalPayments: {
    type: Number,
    default: 0,
  },
  paymentStatus: {
    type: String,
    enum: ["Unpaid", "Partial", "Paid", "Overdue"],
    default: "Unpaid",
  },
});



const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
