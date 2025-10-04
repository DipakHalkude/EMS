import { useNavigate } from "react-router-dom";

export const columns=[
   {
    name:"S No",
    selector:(row)=>row.sno,
   },
   {
     name:"Emp ID",
     selector:(row)=>row.employeeId,
    center:true,
   },
   {
    name:"Name",
    selector:(row)=>row.name,
    center:true,
   },
   {
    name:"Leave Type",
    selector:(row)=>row.leaveType,
    center:true,
   },
   {
    name:"Department",
    selector:(row)=>row.department,
    center:true,
   },
   {
    name:"Days",
    selector:(row)=>row.days,
    center:true,
   },

   {
    name:"Status",
    selector:(row)=>row.status,
    center:true,
   },

   {
    name:"Action",
    selector:(row)=>row.action,
    center:true,
   },
];

export const LeaveButtons=({Id})=>{
    const navigate=useNavigate();

    const handleView=(id)=>{
        navigate(`/admin-dashboard/leave/${id}`);
    };

    return (
        <button 
          onClick={()=>handleView(Id)}
          className="relative group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30 overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-32 transition-transform duration-700"></div>
          <span className="relative">View</span>
        </button>
    );
};