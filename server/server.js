import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/meetings", meetingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/payment-plans", paymentRoutes);

// DB connection
connectDB();

// Routes
app.use("/api/leads", leadRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Mini CRM API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
