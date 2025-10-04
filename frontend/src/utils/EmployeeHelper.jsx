import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: 'S.No',
    selector: row => row.sno,
    sortable: true,
    center: true, // Center align
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    center: true, // Center align
  },
  {
    name: 'Image',
    selector: row => row.profileImage,
    center: true, // Center align
  },
  {
    name: 'Department',
    selector: row => row.deptName,
    center: true, // Center align
  },
  {
    name: 'DOB',
    selector: row => row.dob,
    sortable: true,
    center: true, // Center align
  },

  {
    name: 'Action',
    selector: row => row.action,
    sortable: false,
    center: true, // Center align
  },
];

export const fetchDepartments = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      return response.data.departments || [];
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return [];
};

// employees for salary form
export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      employees = response.data.employees || [];  
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees; // always return an array
};

export const EmployeeButtons = ({ Id, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-1 justify-center flex-wrap">
      <button
        className="px-2 py-1 text-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30 backdrop-blur-sm"
        onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}
      >
        View
      </button>

      <button
        className="px-2 py-1 text-xs bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white rounded font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 border border-green-400/30 backdrop-blur-sm"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${Id}`)}
      >
        Edit
      </button>

      <button
        className="px-2 py-1 text-xs bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white rounded font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30 border border-yellow-400/30 backdrop-blur-sm"
        onClick={() => navigate(`/admin-dashboard/employee/salary/${Id}`)}
      >
        Salary
      </button>

      <button
        className="px-2 py-1 text-xs bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white rounded font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 border border-red-400/30 backdrop-blur-sm"
        onClick={()=>navigate(`/admin-dashboard/employee/leave/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};





