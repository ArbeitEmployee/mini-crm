import Lead from "../models/lead.js";
import Payment from "../models/Payment.js"; // if you track payments

export const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({ status: "Converted" });

    const allDeals = await Lead.find({}, "dealValue");
    const totalDealValue = allDeals.reduce(
      (sum, lead) => sum + (lead.dealValue || 0),
      0
    );

    const pendingPayments = await Payment.countDocuments({ status: "Pending" });

    res.json({
      totalLeads,
      convertedLeads,
      totalDealValue,
      pendingPayments,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard stats fetch failed", error: err });
  }
};
