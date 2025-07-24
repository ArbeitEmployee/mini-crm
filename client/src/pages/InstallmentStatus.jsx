import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InstallmentStatus = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/payment-plans/${paymentId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch payment details");
        }
        const data = await res.json();
        setPayment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!payment) return <div className="p-6">Payment not found</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Installments for {payment.name}</h2>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payment.installments.map((inst, idx) => (
            <tr key={idx}>
              <td className="border p-2">{idx + 1}</td>
              <td className="border p-2">${inst.amount.toFixed(2)}</td>
              <td className="border p-2">{new Date(inst.dueDate).toLocaleDateString()}</td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    inst.status === "Paid" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {inst.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstallmentStatus;