import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddLeave = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("API Response:", response.data); 

      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className=" mt-5 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      {/* Background Grid */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Request for Leave
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Form Container */}
        <div className="bg-gradient-to-br from-gray-900/40 to-blue-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20 p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Leave Type */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                    Leave Type
                  </label>
                  <select
                    name="leaveType"
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="bg-gray-800">
                      Select Leave Type
                    </option>
                    <option value="Sick Leave" className="bg-gray-800">
                      Sick Leave
                    </option>
                    <option value="Casual Leave" className="bg-gray-800">
                      Casual Leave
                    </option>
                    <option value="Annual Leave" className="bg-gray-800">
                      Annual Leave
                    </option>
                  </select>
                </div>
              </div>

              {/* Date Inputs - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                    From Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                    To Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Description - Centered */}
              <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                  <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                    Description
                  </label>
                  <textarea
                    name="reason"
                    placeholder="Reason for leave..."
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 min-h-[120px] resize-vertical"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="relative group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30 overflow-hidden"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-32 transition-transform duration-700"></div>

                  <span className="relative flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Submit Leave Request
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center items-center gap-3 mt-6 text-cyan-300/70 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Leave request system online</span>
        </div>
      </div>
    </div>
  );
};

export default AddLeave;
