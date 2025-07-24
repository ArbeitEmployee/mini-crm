import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/payment-plans");
        const data = await res.json();
        console.log("Payments fetched:", data);
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };
    fetchPayments();
  }, []);

  if (!payments.length)
    return (
      <p className="p-4 text-center text-gray-600">
        No payment plans found.
      </p>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4" style={{ color: "rgba(45, 59, 95, 1)" }}>Payment Table</h1>
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-left font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Installments</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((plan) => (
              <tr
                key={plan._id}
                className="odd:bg-white even:bg-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{plan.name}</td>
                <td className="px-4 py-3">{plan.email}</td>
                <td className="px-4 py-3">{plan.totalAmount}</td>
                <td className="px-4 py-3">
                  {plan.installments?.length || 0}
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/payment-plan/${plan._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
