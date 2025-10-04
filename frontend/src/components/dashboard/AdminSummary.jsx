import { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { FaUsers, FaBuilding, FaMoneyBillWave, FaCalendarCheck, FaClock, FaThumbsUp, FaTimesCircle } from "react-icons/fa";
import axios from 'axios';

const AdminSummary = () => {
  const [summary,setSummary]=useState(null);

  useEffect(()=>{
    const fetchSummary=async()=>{
      try{
         const summary=await axios.get('http://localhost:5000/api/dashboard/summary',{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
         })
         setSummary(summary.data);
      }
      catch(error)
      {
        if(error.response)
        {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    }
    fetchSummary();
  },[])

  if(!summary)
  {
    return <div>Loading ....</div>
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 px-4 md:px-6 py-6 rounded-xl">
      {/* Futuristic Header - Adjusted spacing */}
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          ADMIN DASHBOARD
        </h1>
        <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Dashboard Overview Cards - Reduced gaps */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 md:mb-12">
        <SummaryCard
          icon={<FaUsers className="text-cyan-300" />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
          glow="hover:shadow-cyan-400/20"
        />
        <SummaryCard
          icon={<FaBuilding className="text-purple-300" />}
          text="Departments"
          number={summary.totalDepartments}
          color="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-lg border border-purple-500/30 shadow-lg shadow-purple-500/20"
          glow="hover:shadow-purple-400/20"
        />
        <SummaryCard
          icon={<FaMoneyBillWave className="text-emerald-300" />}
          text="Monthly Pay"
          number={summary.totalSalary}
          color="bg-gradient-to-br from-emerald-900/40 to-green-900/40 backdrop-blur-lg border border-emerald-500/30 shadow-lg shadow-emerald-500/20"
          glow="hover:shadow-emerald-400/20"
        />
      </div>

      {/* Leave Details Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center mb-4 md:mb-6">
          <div className="flex items-center">
            <div className="w-2 h-6 md:h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3"></div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Leave Analytics</h2>
          </div>
          <div className="ml-4 flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
        </div>
        
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={<FaCalendarCheck className="text-blue-300" />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-lg border border-blue-500/30 shadow-lg shadow-blue-500/20"
            glow="hover:shadow-blue-400/20"
          />
          <SummaryCard
            icon={<FaClock className="text-amber-300" />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-gradient-to-br from-amber-900/40 to-orange-900/40 backdrop-blur-lg border border-amber-500/30 shadow-lg shadow-amber-500/20"
            glow="hover:shadow-amber-400/20"
          />
          <SummaryCard
            icon={<FaThumbsUp className="text-green-300" />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-lg border border-green-500/30 shadow-lg shadow-green-500/20"
            glow="hover:shadow-green-400/20"
          />
          <SummaryCard
            icon={<FaTimesCircle className="text-rose-300" />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-gradient-to-br from-rose-900/40 to-red-900/40 backdrop-blur-lg border border-rose-500/30 shadow-lg shadow-rose-500/20"
            glow="hover:shadow-rose-400/20"
          />
        </div>
      </div>

      {/* Futuristic Grid Background */}
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>
    </div>
  );
};

export default AdminSummary;