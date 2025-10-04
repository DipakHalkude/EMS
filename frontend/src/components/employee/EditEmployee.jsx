import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name:"",
    maritalStatus:"",
    designation:"",
    salary:"",
    department:"",
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const {id}=useParams();

    useEffect(() => {
    const loadDepartments = async () => {
      const data = await fetchDepartments();
      setDepartments(data);                                
    };
  
    loadDepartments();
  }, []);


  useEffect(() => {
  const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee((prev)=>({...prev,name:response.data.employee.userId.name,
          maritalStatus:response.data.employee.maritalStatus,
          designation:response.data.employee.designation,
          salary:response.data.employee.salary,
          department:response.data.employee.department._id}));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
}, []);
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setEmployee((prevData)=>({...prevData,[name]:value}));

  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
           const response=await axios.put(`http://localhost:5000/api/employee/${id}`,employee,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
           }
        });

        if(response.data.success)
        {
          navigate('/admin-dashboard/employee');
        }

        }
        catch(error)
        {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error);
            }
        }
  }

  return (
    <>{departments && employee ? (
    <div className=" mt-5 min-h-fit bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          EDIT EMPLOYEE
        </h1>
        <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        <p className="text-cyan-300/70 text-sm mt-3">
          Fill in the employee details below
        </p>
      </div>
      
      {/* Form Container */}
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          {/* Glass morphism form background */}
          <div className="bg-gradient-to-br from-gray-900/40 to-blue-900/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 p-6 md:p-8">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Name */}
                <div className="group">
                  <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                    required
                    className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>


                {/* Marital Status */}
                <div className="group">
                  <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                      Marital Status
                    </span>
                  </label>
                  <select
                    name="maritalStatus"
                    value={employee.maritalStatus}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm appearance-none"
                  >
                    <option value="" className="bg-gray-800">
                      Select Marital Status
                    </option>
                    <option value="single" className="bg-gray-800">
                      Single
                    </option>
                    <option value="married" className="bg-gray-800">
                      Married
                    </option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Designation */}
                <div className="group">
                  <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                      Designation
                    </span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={employee.designation}
                    onChange={handleChange}
                    placeholder="Enter designation"
                    required
                    className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>



                {/* Salary */}
                <div className="group">
                  <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                      Salary
                    </span>
                  </label>
                  <input
                    type="number"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    placeholder="Enter salary amount"
                    required
                    className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>


                              {/* Department */}
                <div className="group">
                  <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                      Department
                    </span>
                  </label>
                  <select
                    name="department"
                    onChange={handleChange}
                    value={employee.department}
                    required
                    className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm appearance-none"
                  >
                    <option value="" className="bg-gray-800">
                      Select Department
                    </option>
                    {
                      departments.map((dept) => (
                        <option
                          key={dept._id}
                          value={dept._id}
                          className="bg-gray-800"
                        >
                        {dept.deptName}
                        </option>
                      ))}
                  </select>
                </div>

              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 md:mt-10 text-center">
              <button
                type="submit"
                className="relative group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 border border-cyan-400/30 overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-32 transition-transform duration-700"></div>

                <span className="relative flex items-center justify-center gap-3">
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
                  Update Employee
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Futuristic Grid Background */}
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>
    </div>
    ):<div>Loading ...</div>}</>
  );
};

export default EditEmployee;
