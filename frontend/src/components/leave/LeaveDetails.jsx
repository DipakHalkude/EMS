import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeaves] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeaves(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, [id]);



  const changeStatus=async(id,status)=>{
     try {
        const response = await axios.put(
          `http://localhost:5000/api/leave/${id}`,{status},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
            navigate('/admin-dashboard/leave')
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
  }

  return (
    <>
      {leave ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/admin-dashboard/leave")}
              className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30 border border-gray-500/30 backdrop-blur-sm"
            >
              ← Back
            </button>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Leave Details
          </h2>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800/40 to-blue-800/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center items-center">
                <img
                  src={`http://localhost:5000/${leave.employeeId.userId?.profileImage}`}
                  alt="Profile"
                  className="w-100 h-100 rounded-2xl object-cover border-4 border-cyan-500/30 shadow-lg shadow-cyan-500/20"
                />
              </div>
              <div className="space-y-6">
                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">
                    Name
                  </p>
                  <p className="text-white text-lg font-medium">
                    {leave.employeeId.userId?.name}
                  </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">
                    Employee ID
                  </p>
                  <p className="text-white text-lg font-medium">
                    {leave.employeeId.employeeId}
                  </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">
                    LeaveType
                  </p>
                  <p className="text-white text-lg font-medium">
                    {leave.leaveType}
                  </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">
                    Reason
                  </p>
                  <p className="text-white text-lg font-medium">
                    {leave.reason}
                  </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">
                    Department
                  </p>
                  <p className="text-white text-lg font-medium">
                    {leave.employeeId.department?.deptName}
                  </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">
                    Start Date
                  </p>
                  <p className="text-white text-lg font-medium">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">
                    End Date
                  </p>
                  <p className="text-white text-lg font-medium">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">
                    {leave.status === "Pending" ? "Action" : "Status"}
                  </p>
                  {leave.status === "Pending" ? (
                    <div className="flex gap-3">
                      <button
                       onClick={() => changeStatus(leave._id,"Approved")}
                       className="relative group bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 hover:from-green-400 hover:via-emerald-500 hover:to-green-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 border-2 border-green-400/50 overflow-hidden"
                      >
                        {/* Double animated backgrounds */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 group-hover:translate-x-32 transition-transform duration-1000"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 -skew-x-12 group-hover:-translate-x-32 transition-transform duration-1000"></div>

                        {/* Content with icon */}
                        <span className="relative flex items-center gap-2 z-10">
                          <svg
                            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Accept
                        </span>

                        {/* Pulse effect on hover */}
                        <div className="absolute inset-0 rounded-xl bg-green-400/0 group-hover:bg-green-400/20 group-hover:animate-pulse transition-all duration-500"></div>
                      </button>

                      <button
                        onClick={() => changeStatus(leave._id,"Rejected")}
                        className="relative group bg-gradient-to-br from-red-500 via-rose-600 to-red-700 hover:from-red-400 hover:via-rose-500 hover:to-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/50 border-2 border-rose-400/50 overflow-hidden"
                      >
                        {/* Double animated backgrounds */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 group-hover:translate-x-32 transition-transform duration-1000"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 -skew-x-12 group-hover:-translate-x-32 transition-transform duration-1000"></div>

                        {/* Content with icon */}
                        <span className="relative flex items-center gap-2 z-10">
                          <svg
                            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Reject
                        </span>

                        {/* Pulse effect on hover */}
                        <div className="absolute inset-0 rounded-xl bg-rose-400/0 group-hover:bg-rose-400/20 group-hover:animate-pulse transition-all duration-500"></div>
                      </button>
                    </div>
                  ) : (
                    <p className="text-white text-lg font-medium">
                      {leave.status}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default LeaveDetails;
