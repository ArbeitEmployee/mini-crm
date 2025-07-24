import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

const LeadTable = () => {
  const [leads, setLeads] = useState([]);
  const [meetingCounts, setMeetingCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const searchInputRef = useRef(null);

  // Auto-focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Fetch leads and meeting counts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch leads
        const leadsResponse = await fetch("http://localhost:3000/api/leads");
        const leadsData = await leadsResponse.json();
        setLeads(leadsData);
        setFilteredLeads(leadsData);

        // Fetch meeting counts for each lead
        const counts = {};
        await Promise.all(
          leadsData.map(async (lead) => {
            const meetingsResponse = await fetch(
              `http://localhost:3000/api/meetings/${lead._id}`
            );
            const meetings = await meetingsResponse.json();
            counts[lead._id] = meetings.length;
          })
        );
        setMeetingCounts(counts);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, []);

  // Filter leads based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredLeads(leads);
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filtered = leads.filter((lead) => {
        return (
          (lead.name && lead.name.toLowerCase().includes(lowerSearchTerm)) ||
          (lead.phone && lead.phone.toLowerCase().includes(lowerSearchTerm)) ||
          (lead.status && lead.status.toLowerCase().includes(lowerSearchTerm)) ||
          (lead.email && lead.email.toLowerCase().includes(lowerSearchTerm)) ||
          (lead.address && lead.address.toLowerCase().includes(lowerSearchTerm))
        );
      });
      setFilteredLeads(filtered);
    }
  }, [searchTerm, leads]);

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setSearchTerm("");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">Leads Table</h2>
        
        <div className="flex items-center">
          {isSearchExpanded && (
            <div className="relative overflow-hidden mr-2">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              {!searchTerm && (
                <span className="absolute top-2 left-0 text-gray-400 animate-marquee whitespace-nowrap">
                  Search by name, email, address, phone, or status...
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

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meetings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      lead.status === "Successful"
                        ? "bg-green-100 text-green-800"
                        : lead.status === "Failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      to={`/lead/${lead._id}/meetings`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      View ({meetingCounts[lead._id] || 0})
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/lead/${lead._id}/add-meeting`}
                      className="text-green-600 hover:text-green-800 hover:underline mr-4"
                    >
                      {meetingCounts[lead._id] > 0 ? "Add Another" : "Add Meeting"}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  {searchTerm ? "No matching leads found." : "No leads available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx global>{`
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

export default LeadTable;