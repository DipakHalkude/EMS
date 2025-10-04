import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import axios from "axios";


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployee] = useState([]);


  useEffect(() => {
    const fetchEmployees = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            deptName: emp.department.deptName,
            name:emp.userId.name,
            dob:new Date(emp.dob).toLocaleDateString(),
            profileImage:<img src={`http://localhost:5000/${emp.userId.profileImage}`} alt="Profile" className="w-10 h-10 rounded-full object-cover mx-auto" />,
            action:(<EmployeeButtons Id={emp._id}/>)
          }));
          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchEmployees();
  }, []);


  const handleFilter=(e)=>{
     const records=employees.filter(emp=>emp.name.toLowerCase().includes(e.target.value.toLowerCase()))
     setFilteredEmployee(records)
  }


  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-64 text-cyan-400 text-xl">
          Loading ...
        </div>
      ) : (
        <div className="mt-5 min-h-fit bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6 relative overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
          </div>

          <div className="text-center mb-8 relative z-10">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Manage Employee
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-br from-gray-800/40 to-blue-800/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 p-6 shadow-lg shadow-cyan-500/20 relative z-10 mb-6">
            <input
              className="px-4 py-3 bg-gray-900/60 backdrop-blur-lg border border-cyan-500/30 rounded-xl text-white placeholder-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 w-full md:w-auto"
              type="text"
              placeholder="Search Departments..."
              onChange={handleFilter}
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30 text-center min-w-[200px]"
            >
              Add New Employee
            </Link>
          </div>
          <div className="relative z-10 bg-gradient-to-br from-gray-800/40 to-blue-800/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20 overflow-hidden">
            <DataTable
              columns={columns}
              data={filteredEmployee}
              customStyles={{
                table: {
                  style: {
                    backgroundColor: "transparent",
                  },
                },
                head: {
                  style: {
                    backgroundColor: "rgba(17, 24, 39, 0.6)",
                    color: "#67e8f9",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    backdropFilter: "blur(10px)",
                  },
                },
                headRow: {
                  style: {
                    borderBottom: "1px solid rgba(6, 182, 212, 0.3)",
                    backdropFilter: "blur(10px)",
                  },
                },
                headCells: {
                  style: {
                    padding: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  },
                },
                cells: {
                  style: {
                    backgroundColor: "rgba(17, 24, 39, 0.4)",
                    color: "white",
                    padding: "16px",
                    borderBottom: "1px solid rgba(6, 182, 212, 0.1)",
                    backdropFilter: "blur(10px)",
                    textAlign: "center", // This will center all cells
                  },
                },
                rows: {
                  style: {
                    backgroundColor: "rgba(17, 24, 39, 0.4)",
                    "&:hover": {
                      backgroundColor: "rgba(6, 182, 212, 0.1)",
                    },
                  },
                },
                pagination: {
                  style: {
                    backgroundColor: 'rgba(17, 24, 39, 0.6)',
                    color: 'white',
                    borderTop: '1px solid rgba(6, 182, 212, 0.3)',
                    backdropFilter: 'blur(10px)',
                  },
                  pageButtonsStyle: {
                    color: '#67e8f9',
                    fill: '#67e8f9',
                    '&:disabled': {
                      color: 'rgba(103, 232, 249, 0.5)',
                    },
                  },
                },
              }}
              pagination
              highlightOnHover
            />
          </div>
        </div>
      )}
    </>
  );
}

export default EmployeeList
