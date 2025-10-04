import React from "react";

// Updated SummaryCard component
const SummaryCard = ({ icon, text, number, color, glow = "" }) => {
  return (
    <div className={`relative group transition-all duration-300 transform hover:scale-105 ${color} rounded-2xl p-6 ${glow}`}>
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm group-hover:blur-md"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80 backdrop-blur-sm">
            LIVE
          </div>
        </div>
        <p className="text-white/80 text-sm font-light mb-2">{text}</p>
        <p className="text-white text-2xl font-bold tracking-wide">{number}</p>
        
        {/* Animated progress bar */}
        <div className="mt-4 w-full bg-white/10 rounded-full h-1">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1 rounded-full group-hover:animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
