import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../utils/LeaveHelper";

const AdminLeave = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves,setFilteredLeaves]=useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        const data = response.data.leaves.map((leave, idx) => ({
          _id: leave._id,
          sno: idx + 1, // now correct row numbering
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          designation: leave.employeeId.designation,
          department: leave.employeeId.department.deptName,
          leaveType: leave.leaveType,
          reason: leave.reason,
          days: Math.ceil(
            (new Date(leave.endDate) - new Date(leave.startDate)) /
              (1000 * 60 * 60 * 24)
          ),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);



  const filterByInput=(e)=>{
    const data=leaves.filter(leave=>leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredLeaves(data);
  }

    const filterByButton=(status)=>{
    const data=leaves.filter(leave=>leave.status.toLowerCase().includes(status.toLowerCase()));
    setFilteredLeaves(data);
  }

  return (
    <div className="mt-5 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      {/* Background Grid */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {filteredLeaves ? (
          <div>
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
                  // value={searchTerm}
                  onChange={filterByInput}
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="flex gap-3">
                <button className="relative group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30 border border-amber-400/30 overflow-hidden"
                onClick={()=>filterByButton("Pending")}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-32 transition-transform duration-700"></div>
                  <span className="relative">Pending</span>
                </button>
                <button onClick={()=>filterByButton("Approved")}  className="relative group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 border border-green-400/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-32 transition-transform duration-700"></div>
                  <span className="relative">Approved</span>
                </button>
                <button onClick={()=>filterByButton("Rejected")}  className="relative group bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 border border-red-400/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-32 transition-transform duration-700"></div>
                  <span className="relative">Rejected</span>
                </button>
              </div>
            </div>

            {/* DataTable Container */}
            <div className="bg-gradient-to-br from-gray-900/40 to-blue-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20 overflow-hidden">
              <DataTable 
                columns={columns} 
                data={filteredLeaves} 
                pagination
                customStyles={{
                  table: {
                    style: {
                      backgroundColor: 'transparent',
                    },
                  },
                  head: {
                    style: {
                      backgroundColor: 'rgba(6, 182, 212, 0.1)',
                      color: '#67e8f9',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    },
                  },
                  headRow: {
                    style: {
                      backgroundColor: 'rgba(6, 182, 212, 0.1)',
                      borderBottom: '1px solid rgba(6, 182, 212, 0.3)',
                    },
                  },
                  headCells: {
                    style: {
                      backgroundColor: 'rgba(6, 182, 212, 0.1)',
                      color: '#67e8f9',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    },
                  },
                  cells: {
                    style: {
                      backgroundColor: 'transparent',
                      color: '#e5e7eb',
                      borderBottom: '1px solid rgba(6, 182, 212, 0.1)',
                    },
                  },
                  rows: {
                    style: {
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(6, 182, 212, 0.05)',
                      },
                    },
                  },
                  pagination: {
                    style: {
                      backgroundColor: 'transparent',
                      color: '#67e8f9',
                      borderTop: '1px solid rgba(6, 182, 212, 0.3)',
                    },
                  },
                }}
              />
            </div>

            {/* Status Indicator */}
            <div className="flex justify-center items-center gap-3 mt-6 text-cyan-300/70 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Leave management system online • {leaves.length} leaves loaded</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="text-cyan-300 text-lg font-semibold">Loading leaves data...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeave;