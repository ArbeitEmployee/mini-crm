import { useState } from "react";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // for toggle icon

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const linkClass =
    "flex items-center gap-2 px-3 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[rgba(45,59,95,1)] hover:text-white";
  const activeClass = "text-white font-semibold";
  const activeStyle = { backgroundColor: "rgba(45, 59, 95, 1)" };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Content Container */}
      <div className="flex flex-grow" style={{ backgroundColor: "rgb(232, 234, 236)" }}>
        {/* Sidebar */}
        <aside
          className={`${
            collapsed ? "w-20" : "w-64"
          } transition-all duration-300 p-4 min-h-full bg-[rgb(232,234,236)]`}
        >
          {/* Toggle button with ARBEIT label */}
          <div className="mb-4 flex items-center gap-2">
            <button
              className="p-2 bg-white rounded shadow hover:bg-gray-100"
              onClick={toggleSidebar}
              title={collapsed ? "Expand" : "Collapse"}
            >
              <FaBars />
            </button>
            {!collapsed && <span className="text-lg font-bold text-[rgba(45,59,95,1)]">ARBEIT</span>}
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 font-medium text-[rgba(45,59,95,1)]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeClass}` : linkClass
              }
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <span>🏠</span>
              {!collapsed && <span>Dashboard</span>}
            </NavLink>

            <NavLink
              to="/add-lead"
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeClass}` : linkClass
              }
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <span>➕</span>
              {!collapsed && <span>Add Lead</span>}
            </NavLink>

            <NavLink
              to="/leads"
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeClass}` : linkClass
              }
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <span>📋</span>
              {!collapsed && <span>Lead Table</span>}
            </NavLink>

            <NavLink
              to="/payments"
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeClass}` : linkClass
              }
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <span>💵</span>
              {!collapsed && <span>Payments</span>}
            </NavLink>

            <NavLink
              to="/payment-table"
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeClass}` : linkClass
              }
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <span>📊</span>
              {!collapsed && <span>Payment Table</span>}
            </NavLink>
          </nav>
        </aside>

        {/* Main Page Content */}
        <main className="flex-grow p-6 mr-15 my-6 bg-white rounded-xl shadow">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
