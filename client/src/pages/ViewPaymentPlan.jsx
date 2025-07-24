import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ViewPaymentPlan = () => {
  const { id } = useParams(); // Get payment plan ID from URL
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/payment-plans/${id}`);
        const data = await res.json();
        setPlan(data);
      } catch (err) {
        console.error("Error fetching plan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!plan) return <div className="p-4 text-red-500">Plan not found</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Payment Plan for {plan.name}</h2>
      <p className="mb-1">📧 Email: <strong>{plan.email}</strong></p>
      <p className="mb-1">💰 Total Amount: <strong>{plan.totalAmount}</strong></p>
      <p className="mb-4">📆 Total Installments: <strong>{plan.installments?.length || 0}</strong></p>

      <h3 className="text-xl mt-4 mb-2 font-semibold">Installment Schedule</h3>
      <table className="w-full border border-gray-300 rounded-md shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border text-left">#</th>
            <th className="p-2 border text-left">Amount</th>
            <th className="p-2 border text-left">Due Date</th>
            <th className="p-2 border text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {plan.installments?.length > 0 ? (
            plan.installments.map((inst, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{inst.amount}</td>
                <td className="p-2 border">{new Date(inst.dueDate).toLocaleDateString()}</td>
                <td className={`p-2 border font-semibold ${inst.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                  {inst.status === "Paid" ? "✅ Paid" : "❌ Unpaid"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 border text-center" colSpan="4">No Installments</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPaymentPlan;
