import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddInstallmentPayment = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [installments, setInstallments] = useState([
    { amount: "", dueDate: "", status: "pending", notes: "" },
  ]);

  const navigate = useNavigate();

  const handleInstallmentChange = (index, field, value) => {
    const updated = [...installments];
    updated[index][field] = value;
    setInstallments(updated);
  };

  const addInstallmentRow = () => {
    setInstallments([
      ...installments,
      { amount: "", dueDate: "", status: "pending", notes: "" },
    ]);
  };

  const removeInstallmentRow = (index) => {
    const updated = installments.filter((_, i) => i !== index);
    setInstallments(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/payment-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, installments }),
      });

      if (res.ok) {
        alert("Payment plan created successfully!");
        navigate("/payment-table");
      } else {
        alert("Failed to create payment plan");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Create Payment Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Installments</label>
          {installments.map((installment, index) => (
            <div key={index} className="mb-4 border p-3 rounded bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <input
                  type="number"
                  placeholder="Amount"
                  value={installment.amount}
                  onChange={(e) =>
                    handleInstallmentChange(index, "amount", e.target.value)
                  }
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="date"
                  value={installment.dueDate}
                  onChange={(e) =>
                    handleInstallmentChange(index, "dueDate", e.target.value)
                  }
                  required
                  className="border p-2 rounded"
                />
                <select
                  value={installment.status}
                  onChange={(e) =>
                    handleInstallmentChange(index, "status", e.target.value)
                  }
                  className="border p-2 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
                <input
                  type="text"
                  placeholder="Notes"
                  value={installment.notes}
                  onChange={(e) =>
                    handleInstallmentChange(index, "notes", e.target.value)
                  }
                  className="border p-2 rounded"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeInstallmentRow(index)}
                  className="text-sm text-red-600 mt-2 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addInstallmentRow}
            className="text-blue-600 font-medium hover:underline"
          >
            ➕ Add Installment
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Plan
        </button>
      </form>
    </div>
  );
};

export default AddInstallmentPayment;
