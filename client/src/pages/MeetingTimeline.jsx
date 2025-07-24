import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MeetingTimeline = () => {
  const { leadId } = useParams();
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/meetings/${leadId}`)
      .then((res) => res.json())
      .then(setMeetings)
      .catch((err) => console.error("Failed to fetch meetings", err));
  }, [leadId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Meeting History</h2>
      {meetings.length === 0 ? (
        <p>No meetings found for this lead.</p>
      ) : (
        <ul className="space-y-4">
          {meetings.map((m) => (
            <li
              key={m._id}
              className="border p-4 rounded shadow bg-gray-50 space-y-1"
            >
              <p><strong>Date:</strong> {new Date(m.date).toLocaleDateString()}</p>
              <p><strong>Deal:</strong> {m.deal}</p>
              <p><strong>Status:</strong> {m.status}</p>
              <p><strong>Notes:</strong> {m.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MeetingTimeline;
