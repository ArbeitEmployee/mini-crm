import { useState } from "react";
import { useParams } from "react-router-dom"; // ✅ Get leadId from URL

const AddMeeting = () => {
  const { leadId } = useParams(); // ✅ Extract leadId from route

  const [formData, setFormData] = useState({
    date: "",
    deal: "",
    status: "Pending",
    notes: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      leadId, // ✅ Attach leadId to the payload
    };

    try {
      const res = await fetch("http://localhost:3000/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("✅ Meeting added successfully.");
        setFormData({ date: "", deal: "", status: "Pending", notes: "" });
      } else {
        setMessage("❌ Failed to add meeting.");
      }
    } catch {
      setMessage("❌ Server error.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Add Meeting for Lead</h2>

      {message && <p className="mb-3 text-sm text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="deal"
          value={formData.deal}
          onChange={handleChange}
          placeholder="Deal discussed"
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Successful">Successful</option>
          <option value="Failed">Failed</option>
        </select>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Meeting notes"
          className="w-full p-2 border rounded"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Meeting
        </button>
      </form>
    </div>
  );
};

export default AddMeeting;
