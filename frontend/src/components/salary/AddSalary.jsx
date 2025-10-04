import React, { useState, useEffect } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const [salary, setSalary] = useState({
    employeeId: "",
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDepartments = async () => {
      const data = await fetchDepartments();
      setDepartments(data);
    };
    loadDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emp = await getEmployees(e.target.value);
    setEmployees(emp);
  };

  // Fixed handleChange: convert numeric inputs to numbers
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSalary((prev) => ({
      ...prev,
      [name]:
        name === "basicSalary" ||
        name === "allowance" ||
        name === "deductions"
          ? Number(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/salary/add",
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message) {
        navigate("/admin-dashboard/employee");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error || "Error adding salary");
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <>
      {departments.length ? (
        <div className="mt-5 min-h-fit bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4 md:p-6">
          {/* Header */}
          <div className="mb-6 md:mb-8 text-center">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              Add SALARY
            </h1>
            <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
            <p className="text-cyan-300/70 text-sm mt-3">
              Fill in the employee details below
            </p>
          </div>

          {/* Form */}
          <div className="max-w-6xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <div className="bg-gradient-to-br from-gray-900/40 to-blue-900/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {/* Left */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-cyan-300 text-sm font-semibold mb-2">
                        Department
                      </label>
                      <select
                        name="department"
                        onChange={handleDepartment}
                        required
                        className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white"
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept._id} value={dept._id}>
                            {dept.deptName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="group">
                      <label className="block text-cyan-300 text-sm font-semibold mb-2">
                        Basic Salary
                      </label>
                      <input
                        type="number"
                        name="basicSalary"
                        onChange={handleChange}
                        placeholder="Enter Basic Salary"
                        required
                        className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-cyan-300 text-sm font-semibold mb-2">
                        Deductions
                      </label>
                      <input
                        type="number"
                        name="deductions"
                        onChange={handleChange}
                        placeholder="Enter Deductions"
                        required
                        className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white"
                      />
                    </div>
                  </div>

                  {/* Right */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-cyan-300 text-sm font-semibold mb-2">
                        Employee
                      </label>
                      <select
                        name="employeeId"
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white"
                      >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                          <option key={emp._id} value={emp._id}>
                            {emp.employeeId}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="group">
                      <label className="block text-cyan-300 text-sm font-semibold mb-2">
                        Allowance
                      </label>
                      <input
                        type="number"
                        name="allowances"
                        onChange={handleChange}
                        placeholder="Enter Allowance"
                        required
                        className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-cyan-300 text-sm font-semibold mb-2">
                        Pay Date
                      </label>
                      <input
                        type="date"
                        name="payDate"
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-8 text-center">
                  <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
                  >
                    Add Salary
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default AddSalary;
