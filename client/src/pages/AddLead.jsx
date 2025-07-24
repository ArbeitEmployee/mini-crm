import { useState } from "react";

const AddLead = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    status: "New",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Lead added successfully!");
        setFormData({
          name: "",
          address: "",
          phone: "",
          email: "",
          status: "New",
        });
        setErrors({});
      } else {
        setMessage("❌ Failed to add lead.");
      }
    } catch (err) {
      console.error("Error adding lead:", err);
      setMessage("❌ Server error.");
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "rgb(243,245,247)" }}>
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "rgba(45, 59, 95, 1)" }}
        >
          Add New Lead
        </h2>

        {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <input
              name="name"
              type="text"
              placeholder="Lead Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Address */}
          <div>
            <input
              name="address"
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Phone */}
          <div>
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Status */}
          <div>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[rgba(45,59,95,1)] hover:bg-[rgb(35,49,85)] text-white px-4 py-2 rounded transition-colors duration-300 text-center"
          >
            Add Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLead;
