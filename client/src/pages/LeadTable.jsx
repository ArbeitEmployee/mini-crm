import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LeadTable = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) => console.error("Failed to load leads:", err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: "rgba(45, 59, 95, 1)" }}>Leads Table</h2>

      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200 text-left font-semibold text-gray-700">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Deal Status</th>
              <th className="px-4 py-3">View Meetings</th>
              <th className="px-4 py-3">Add Meeting</th>
            </tr>
          </thead>

          <tbody>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="odd:bg-white even:bg-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3">{lead.address}</td>
                  <td className="px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">{lead.status}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/lead/${lead._id}/meetings`}
                      className="text-blue-600 hover:underline"
                    >
                      View Meetings
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/lead/${lead._id}/add-meeting`}
                      className="text-green-600 hover:underline"
                    >
                      + Add Meeting
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center px-4 py-6 text-gray-500 italic"
                >
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
