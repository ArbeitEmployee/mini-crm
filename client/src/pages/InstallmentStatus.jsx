import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InstallmentStatus = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/payments`);
        const data = await res.json();
        const found = data.find((p) => p._id === paymentId);
        setPayment(found);
      } catch (err) {
        console.error("Failed to fetch payment detail:", err);
      }
    };

    fetchPayment();
  }, [paymentId]);

  if (!payment) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Installments for {payment.name}</h2>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payment.installments.map((inst, idx) => (
            <tr key={idx}>
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
