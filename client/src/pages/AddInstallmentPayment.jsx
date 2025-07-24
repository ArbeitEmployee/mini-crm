import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddInstallmentPayment = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    totalAmount: "",
    numberOfInstallments: "",
    startDate: "",
  });
  const [installments, setInstallments] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const generateInstallments = () => {
    if (!form.numberOfInstallments || !form.totalAmount || !form.startDate) return;

    const numInstallments = parseInt(form.numberOfInstallments);
    if (numInstallments <= 0) return;

    const totalAmount = parseFloat(form.totalAmount);
    const installmentAmount = (totalAmount / numInstallments).toFixed(2);
    const startDate = new Date(form.startDate);

    const newInstallments = Array(numInstallments).fill().map((_, i) => {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);
      
      return {
        amount: installmentAmount,
        dueDate: dueDate.toISOString().split('T')[0],
        status: "Unpaid",
        notes: ""
      };
    });

    setInstallments(newInstallments);
  };

  const handleInstallmentChange = (index, field, value) => {
    const updated = [...installments];
    updated[index][field] = value;
    setInstallments(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.email) errors.email = "Email is required";
    if (!form.totalAmount) errors.totalAmount = "Total amount is required";
    if (!form.numberOfInstallments) errors.numberOfInstallments = "Number of installments is required";
    if (!form.startDate) errors.startDate = "Start date is required";

    installments.forEach((inst, index) => {
      if (!inst.amount || !inst.dueDate) {
        errors[`installment_${index}`] = "Installment amount and due date are required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/payment-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          installments,
        }),
      });

      if (res.ok) {
        alert("Payment plan created successfully!");
        navigate("/payment-table");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to create payment plan");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-800">
          Create Payment Plan
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Total Amount</label>
              <input
                type="number"
                name="totalAmount"
                value={form.totalAmount}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              {formErrors.totalAmount && <p className="text-red-500 text-sm mt-1">{formErrors.totalAmount}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Number of Installments</label>
              <input
                type="number"
                name="numberOfInstallments"
                value={form.numberOfInstallments}
                onChange={handleChange}
                onBlur={generateInstallments}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              {formErrors.numberOfInstallments && (
                <p className="text-red-500 text-sm mt-1">{formErrors.numberOfInstallments}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                onBlur={generateInstallments}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              {formErrors.startDate && <p className="text-red-500 text-sm mt-1">{formErrors.startDate}</p>}
            </div>
          </div>

          {installments.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Installment Schedule</h3>
              
              {installments.map((inst, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <input
                        type="number"
                        value={inst.amount}
                        onChange={(e) => handleInstallmentChange(index, "amount", e.target.value)}
                        className="w-full p-2 border rounded focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {index === 0 ? "Start Date" : "Due Date"}
                      </label>
                      <input
                        type="date"
                        value={inst.dueDate}
                        onChange={(e) => handleInstallmentChange(index, "dueDate", e.target.value)}
                        className="w-full p-2 border rounded focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={inst.status}
                        onChange={(e) => handleInstallmentChange(index, "status", e.target.value)}
                        className="w-full p-2 border rounded focus:ring-indigo-500"
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <input
                        type="text"
                        value={inst.notes}
                        onChange={(e) => handleInstallmentChange(index, "notes", e.target.value)}
                        className="w-full p-2 border rounded focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            Create Payment Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInstallmentPayment;