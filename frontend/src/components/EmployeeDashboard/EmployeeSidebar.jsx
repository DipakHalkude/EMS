import { NavLink, useLocation } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
  FaBars,
  FaTimes,
  FaRocket,
  FaNetworkWired,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const EmployeeSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const {user}=useAuth();

  const links = [
    { to: "/employee-dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { to: `/employee-dashboard/profile/${user._id}`, icon: FaUsers, label: "My Profile" },
    {
      to: `/employee-dashboard/leaves`,
      icon: FaBuilding,
      label: "Leaves",
    },
    { to: `/employee-dashboard/salary/${user._id}`, icon: FaMoneyBillWave, label: "Salary" },
    { to: "/employee-dashboard/setting", icon: FaCogs, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Hamburger - Better positioning */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gradient-to-br from-cyan-600 to-blue-600 p-2 md:p-3 rounded-lg md:rounded-xl backdrop-blur-lg border border-cyan-400/30 shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-110 hover:shadow-cyan-400/40"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FaTimes className="text-base md:text-lg" />
        ) : (
          <FaBars className="text-base md:text-lg" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-all duration-500 ease-out`}
      >
        {/* Main Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        </div>

        {/* Glass Morphism Overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-r border-cyan-500/20"></div>

        {/* Animated Border Glow */}
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 opacity-60"></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header - Adjusted height */}
          <div className="h-20 md:h-24 flex items-center justify-center border-b border-cyan-500/20 relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-1 md:mb-2">
                <div className="text-cyan-400 text-xl md:text-2xl">
                  <FaRocket />
                </div>
                <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-widest drop-shadow-lg">
                  EMS
                </h3>
              </div>
              <p className="text-xs text-cyan-300/70 font-mono tracking-wider hidden md:block">
                EMPLOYEE PORTAL
              </p>
            </div>
          </div>

          {/* Navigation Links - Adjusted padding */}
          <div className="flex-1 px-3 md:px-4 py-6 md:py-8 space-y-2 md:space-y-3">
            {links.map((link, i) => {
              const Icon = link.icon;
              const active = location.pathname === link.to;

              return (
                <NavLink
                  key={i}
                  to={link.to}
                  className={`relative group flex items-center gap-3 md:gap-4 py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl font-semibold tracking-wide transition-all duration-300 ease-out ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20 border border-cyan-400/30 transform scale-105"
                      : "text-gray-300 hover:bg-white/10 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                >
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 md:h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full"></div>
                  )}

                  {/* Icon with glow effect */}
                  <div
                    className={`relative ${
                      active
                        ? "text-cyan-400"
                        : "text-gray-400 group-hover:text-cyan-300"
                    } transition-colors duration-300`}
                  >
                    <Icon className="text-lg md:text-xl" />
                    {active && (
                      <div className="absolute inset-0 text-cyan-400 blur-sm opacity-50 animate-pulse">
                        <Icon className="text-lg md:text-xl" />
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`relative ${
                      active ? "text-white font-bold" : "group-hover:text-white"
                    } transition-colors duration-300 text-sm md:text-base`}
                  >
                    {link.label}
                  </span>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                </NavLink>
              );
            })}
          </div>

          {/* Footer - Adjusted padding */}
          <div className="p-4 md:p-6 border-t border-cyan-500/20">
            <div className="flex items-center gap-2 md:gap-3 text-cyan-300/70">
              <FaNetworkWired className="text-cyan-400 animate-pulse text-sm md:text-base" />
              <div className="flex-1">
                <p className="text-xs md:text-sm font-mono">System Online</p>
                <div className="flex items-center gap-1 md:gap-2 mt-1">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-xs text-cyan-400/60">
                    All systems operational
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default EmployeeSidebar;
