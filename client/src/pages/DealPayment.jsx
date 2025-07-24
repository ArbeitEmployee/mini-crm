import { useState } from "react";
import { useParams } from "react-router-dom";

const DealPayment = () => {
  const { leadId } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    totalAmount: "",
    numberOfInstallments: "",
    startDate: "",
  });

  const [installments, setInstallments] = useState([
    { amount: "", dueDate: "", status: "pending", notes: "" },
  ]);

  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    const updated = [...installments];
    updated.splice(index, 1);
    setInstallments(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!form.name) errors.name = "Name is required.";
    if (!form.email) errors.email = "Email is required.";
    if (!form.totalAmount) errors.totalAmount = "Total amount is required.";
    if (!form.numberOfInstallments) errors.numberOfInstallments = "Number of installments is required.";
    if (!form.startDate) errors.startDate = "Start date is required.";

    installments.forEach((inst, index) => {
      if (!inst.amount || !inst.dueDate) {
        errors[`installment_${index}`] = "Installment amount and due date are required.";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const res = await fetch("http://localhost:3000/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        leadId,
        installments,
      }),
    });

    await res.json();
    if (res.ok) {
      setMessage("✅ Payment plan created successfully");
      setForm({
        name: "",
        email: "",
        totalAmount: "",
        numberOfInstallments: "",
        startDate: "",
      });
      setInstallments([{ amount: "", dueDate: "", status: "pending", notes: "" }]);
    } else {
      setMessage("❌ Failed to create plan");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f5f7] py-10">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "rgba(45, 59, 95, 1)" }}>
          Create Payment Plan
        </h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {formErrors.name && <p className="text-red-600 text-sm">{formErrors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {formErrors.email && <p className="text-red-600 text-sm">{formErrors.email}</p>}

          <input
            type="number"
            name="totalAmount"
            placeholder="Total Deal Amount"
            value={form.totalAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {formErrors.totalAmount && <p className="text-red-600 text-sm">{formErrors.totalAmount}</p>}

          <input
            type="number"
            name="numberOfInstallments"
            placeholder="Number of Installments"
            value={form.numberOfInstallments}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {formErrors.numberOfInstallments && (
            <p className="text-red-600 text-sm">{formErrors.numberOfInstallments}</p>
          )}

          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {formErrors.startDate && (
            <p className="text-red-600 text-sm">{formErrors.startDate}</p>
          )}

          <div>
            <label className="block font-medium mb-2">Installments</label>
            {installments.map((inst, index) => (
              <div key={index} className="mb-4 border p-3 rounded bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={inst.amount}
                    onChange={(e) => handleInstallmentChange(index, "amount", e.target.value)}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="date"
                    value={inst.dueDate}
                    onChange={(e) => handleInstallmentChange(index, "dueDate", e.target.value)}
                    className="border p-2 rounded"
                    required
                  />
                  <select
                    value={inst.status}
                    onChange={(e) => handleInstallmentChange(index, "status", e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Notes"
                    value={inst.notes}
                    onChange={(e) => handleInstallmentChange(index, "notes", e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
                {formErrors[`installment_${index}`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors[`installment_${index}`]}
                  </p>
                )}
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
              className="font-medium hover:underline"
              style={{ color: "rgba(45, 59, 95, 1)" }}
            >
              ➕ Add Installment
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[rgba(45,59,95,1)] hover:bg-[rgb(35,49,85)] text-white px-4 py-2 rounded text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DealPayment;
