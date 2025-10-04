import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const LeaveList = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let sno = 1;

  const fetchLeaves = async () => {
    try {
      let url = "";
      if (user.role === "employee") {
        url = `http://localhost:5000/api/leave/${user._id}`;
      } else if (user.role === "admin") {
        url = id
          ? `http://localhost:5000/api/leave/${id}`
          : `http://localhost:5000/api/leave`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setLeaves(response.data.leaves);
        setFilteredLeaves(response.data.leaves);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Server error");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [user._id, id]);

  useEffect(() => {
    const filtered = leaves.filter(
      (leave) =>
        leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeaves(filtered);
  }, [searchTerm, leaves]);

  return (
    <div className=" mt-5 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      {/* Background Grid */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Manage Leaves
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Search and Add Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 p-6 bg-gradient-to-br from-gray-900/40 to-blue-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
          <div className="flex-1 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by Leave Type, Reason or Status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          {user.role === "employee" && (
            <Link
              to="/employee-dashboard/add-leave"
              className="relative group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30 overflow-hidden whitespace-nowrap"
            >
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
                Add New Leave
              </span>
            </Link>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="text-cyan-300 text-sm font-semibold">
            Showing {filteredLeaves.length} of {leaves.length} leaves
          </div>
          {searchTerm && (
            <div className="text-cyan-300/70 text-sm">
              Search: "{searchTerm}"
            </div>
          )}
        </div>

        {/* Leaves Table */}
        <div className="bg-gradient-to-br from-gray-900/40 to-blue-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-cyan-500/20">
              <thead className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-r border-cyan-500/20">
                    SNO
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-r border-cyan-500/20">
                    LEAVE TYPE
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-r border-cyan-500/20">
                    FROM
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-r border-cyan-500/20">
                    TO
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-r border-cyan-500/20">
                    DESCRIPTION
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900/40 divide-y divide-cyan-500/10">
                {filteredLeaves.length > 0 ? (
                  filteredLeaves.map((leave) => (
                    <tr
                      key={leave._id}
                      className="hover:bg-cyan-500/10 transition-all duration-300 ease-in-out group border-l-4 border-l-transparent hover:border-l-cyan-400"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-100 group-hover:text-white">
                        {sno++}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 font-semibold group-hover:text-cyan-300">
                        {leave.leaveType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-white">
                        {new Date(leave.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-white">
                        {new Date(leave.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 group-hover:text-white max-w-xs truncate">
                        {leave.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            leave.status === "approved"
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : leave.status === "rejected"
                              ? "bg-red-500/20 text-red-300 border border-red-500/30"
                              : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          }`}
                        >
                          {leave.status.charAt(0).toUpperCase() +
                            leave.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center">
                      <div className="text-cyan-300/70 text-lg font-semibold">
                        {searchTerm
                          ? "No leaves found matching your search."
                          : "No leaves found."}
                      </div>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm underline transition-colors duration-300"
                        >
                          Clear search
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center items-center gap-3 mt-6 text-cyan-300/70 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>
            Leave management system online • Last updated:{" "}
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeaveList;



