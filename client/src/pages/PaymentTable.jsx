import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/payment-plans");
        const data = await res.json();
        console.log("Payments fetched:", data);
        setPayments(data);
        setFilteredPayments(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };
    fetchPayments();
  }, []);

  // Filter payments based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPayments(payments);
    } else {
      const filtered = payments.filter((plan) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
          plan.name?.toLowerCase().includes(lowerSearchTerm) ||
          plan.email?.toLowerCase().includes(lowerSearchTerm) ||
          plan.totalAmount?.toString().includes(searchTerm) ||
          (plan.installments?.length || 0).toString().includes(searchTerm)
        );
      });
      setFilteredPayments(filtered);
    }
  }, [searchTerm, payments]);

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchTerm("");
    }
  };

  if (!payments.length)
    return (
      <p className="p-4 text-center text-gray-600">
        No payment plans found.
      </p>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold" style={{ color: "rgba(45, 59, 95, 1)" }}>
          Payment Table
        </h1>
        
        <div className="flex items-center">
          {isSearchExpanded && (
            <div className="relative overflow-hidden mr-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              {!searchTerm && (
                <span className="absolute top-2 left-0 text-gray-400 animate-marquee whitespace-nowrap">
                  Search by name, email, amount, or installments...
                </span>
              )}
            </div>
          )}
          <button
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-gray-200 transition"
            aria-label={isSearchExpanded ? "Close search" : "Open search"}
          >
            {isSearchExpanded ? <FiX size={20} /> : <FiSearch size={20} />}
          </button>
        </div>
      </div>

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
            {filteredPayments.length > 0 ? (
              filteredPayments.map((plan) => (
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
                      to={`/payment-plans/${plan._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-4 py-6 text-gray-500 italic">
                  {searchTerm ? "No matching payment plans found." : "No payment plans found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default PaymentTable;