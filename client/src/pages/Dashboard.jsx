const Dashboard = () => {
  // Dummy data (replace with real data later)
  const stats = [
    {
      title: "Total Leads",
      value: 120,
      icon: "📋",
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Converted Leads",
      value: 56,
      icon: "✅",
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Total Deal Value",
      value: "$42,500",
      icon: "💰",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Pending Payments",
      value: 17,
      icon: "⏳",
      color: "bg-red-100 text-red-800",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 " style={{ color: "rgba(45, 59, 95, 1)" }}>Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded shadow p-4 ${item.color} flex flex-col items-center`}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-lg font-semibold">{item.title}</div>
            <div className="text-2xl font-bold">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
