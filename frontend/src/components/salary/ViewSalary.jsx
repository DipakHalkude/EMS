import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("Server error");
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, [id]);

  const filterSalaries = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredRecords = salaries.filter((salary) => {
      const empIdStr = salary.employeeId?.employeeId?.toLowerCase() || "";
      const payDateStr = new Date(salary.payDate).toLocaleDateString().toLowerCase();
      return empIdStr.includes(value) || payDateStr.includes(value);
    });
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {!filteredSalaries ? (
        <div className="flex justify-center items-center h-64 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="text-xl text-cyan-300 animate-pulse">Loading ...</div>
        </div>
      ) : (
        <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 pb-2 border-b-2 border-cyan-500/30">Salary History</h2>
            
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search By Employee Id or Pay Date"
                onChange={filterSalaries}
                className="w-full max-w-md px-4 py-3 bg-gray-800/50 backdrop-blur-lg border border-cyan-500/30 rounded-xl shadow-lg shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            
            {filteredSalaries.length > 0 ? (
              <div className="bg-gray-800/40 backdrop-blur-lg rounded-xl shadow-2xl shadow-cyan-500/10 overflow-hidden border border-cyan-500/20">
                <table className="min-w-full divide-y divide-cyan-500/20">
                  <thead className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-r border-cyan-500/20">SNO</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-r border-cyan-500/20">Emp Id</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-r border-cyan-500/20">Salary</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-r border-cyan-500/20">Allowance</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-r border-cyan-500/20">Deduction</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-r border-cyan-500/20">Total</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Pay Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900/40 divide-y divide-cyan-500/10">
                    {filteredSalaries.map((salary) => (
                      <tr 
                        key={salary._id} 
                        className="hover:bg-cyan-500/10 transition-all duration-300 ease-in-out group border-l-4 border-l-transparent hover:border-l-cyan-400"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-100 group-hover:text-white">{sno++}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 font-semibold group-hover:text-cyan-300">{salary.employeeId?.employeeId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-white">₹{salary.basicSalary}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-medium group-hover:text-green-300">+₹{salary.allowances}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 font-medium group-hover:text-red-300">-₹{salary.deductions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-300 font-bold group-hover:text-cyan-200">₹{salary.netSalary}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 group-hover:text-gray-200">{new Date(salary.payDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-gray-800/40 backdrop-blur-lg rounded-xl shadow-2xl border border-cyan-500/20">
                <div className="text-6xl text-cyan-400/50 mb-4">💫</div>
                <div className="text-xl font-semibold text-cyan-300 mb-2">No Records Found</div>
                <div className="text-cyan-400/70">Try adjusting your search criteria</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSalary;