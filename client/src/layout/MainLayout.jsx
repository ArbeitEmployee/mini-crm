import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  // Color definitions
  const sidebarBg = "bg-[rgb(180,190,189)]";
  const pageBg = "bg-[rgb(230,233,233)]";
  const linkClass = "flex items-center gap-2 px-3 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[rgba(45,59,95,0.9)] hover:text-white";
  const activeClass = "text-white font-semibold";
  const activeStyle = { backgroundColor: "rgba(45, 59, 95, 0.9)" };

  return (
    <div className={`flex flex-col min-h-screen p-6 ${pageBg}`}>
      {/* Unified Container */}
      <div className="flex flex-grow rounded-xl shadow-lg overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            collapsed ? "w-20" : "w-64"
          } transition-all duration-300 p-4 ${sidebarBg}`}
        >
          {/* Toggle button and logo - now perfectly aligned */}
          <div className="ml-2 mb-4 flex items-center gap-3">
            <button
              className="p-1.5 bg-white rounded-md shadow-sm hover:bg-gray-50 flex items-center justify-center"
              onClick={toggleSidebar}
              title={collapsed ? "Expand" : "Collapse"}
            >
              <FaBars className="text-[rgba(45,59,95,1)] text-sm" />
            </button>
            {!collapsed && (
              <span className="text-lg font-bold text-[rgba(45,59,95,1)]">
                ARBEIT
              </span>
            )}
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

            {/* Other nav links remain the same */}
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

        {/* Main Content Area */}
        <main className="flex-grow p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;