import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Navbar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full md:left-64 md:w-[calc(100%-16rem)] z-50 bg-gradient-to-r from-gray-900/80 to-blue-900/80 backdrop-blur-xl border-b border-cyan-500/20 px-4 md:px-6 py-4 flex justify-between items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_50%,transparent_75%)] bg-[length:10px_10px] opacity-20"></div>

      {/* Left side - Burger + Welcome */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Burger button (mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-400 hover:text-white text-xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 md:gap-3">
          Welcome{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-extrabold">
            {user?.name || "Admin"}
          </span>
        </h2>
      </div>

      {/* Right side - Logout */}
      <div className="relative z-10">
        <button
          onClick={logout}
          className="relative group bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-rose-500/30 border border-rose-400/30 overflow-hidden text-sm md:text-base"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-32 transition-transform duration-700"></div>
          <span className="relative flex items-center gap-1 md:gap-2">
            <svg
              className="w-3 h-3 md:w-4 md:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </span>
        </button>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 md:w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-full opacity-80"></div>
    </nav>
  );
};

export default Navbar;
