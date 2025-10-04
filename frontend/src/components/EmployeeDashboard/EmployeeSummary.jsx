import { useAuth } from "../../context/authContext";
import { FaUser, FaIdCard, FaBuilding, FaBriefcase } from "react-icons/fa";

const EmployeeSummary = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="w-full flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <div className="relative group transition-all duration-500 transform hover:scale-[1.02] bg-gradient-to-br from-gray-900/60 to-blue-900/60 rounded-3xl p-8 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/30">
          
          {/* Enhanced Animated Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-all duration-500 blur-lg"></div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.03)_50%,transparent_75%)] bg-[size:20px_20px] opacity-60"></div>

          <div className="relative z-10">
            {/* Main Content Layout */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Section - Avatar and Basic Info */}
              <div className="flex items-center gap-6 flex-1">
                {/* Enhanced Avatar Container */}
                <div className="relative">
                  <div className="text-6xl text-cyan-300 transform group-hover:scale-110 transition-transform duration-500">
                    <div className="relative">
                      <FaUser className="w-20 h-20 text-cyan-300" />
                      {/* Outer Glow */}
                      <div className="absolute inset-0 w-20 h-20 text-cyan-400 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                        <FaUser className="w-20 h-20" />
                      </div>
                    </div>
                  </div>
                  {/* Online Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-gray-900 animate-pulse"></div>
                </div>

                {/* Enhanced Text Content */}
                <div className="flex-1">
                  <p className="text-cyan-300/80 text-lg font-light mb-2 tracking-wide">
                    {getGreeting()}
                  </p>
                  <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 bg-[length:200%_100%] animate-gradient">
                    {user?.name || "Employee"}
                  </h2>
                  <div className="flex items-center gap-4 text-base text-cyan-300/70">
                    <div className="flex items-center gap-2 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold">ACTIVE NOW</span>
                    </div>
                    <div className="text-cyan-300/50">|</div>
                    <span className="text-cyan-300/80">Welcome back! 👋</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="mt-8 w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse"
                style={{ width: '85%' }}
              ></div>
            </div>

            {/* Status Footer */}
            <div className="flex justify-between items-center mt-4 text-cyan-300/50 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <span>Last active: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummary;