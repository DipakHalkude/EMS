import { useNavigate } from "react-router-dom";
import axios from "axios";

// In your DepartmentHelper file
export const columns = [
  {
    name: 'S.No',
    selector: row => row.sno,
    sortable: true,
    center: true, // Center align
  },
  {
    name: 'Department Name',
    selector: row => row.deptName,
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


export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department? All related users,employees, leaves, and salaries will also be deleted!"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/department/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Department deleted successfully!");
        onDepartmentDelete(); // refresh the department list
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert(error.response?.data?.error || "Server error while deleting department");
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      <button
        className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30 backdrop-blur-sm"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>

      <button
        className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-rose-500/30 border border-rose-400/30 backdrop-blur-sm"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
