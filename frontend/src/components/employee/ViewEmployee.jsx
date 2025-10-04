import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewEmployee = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

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
        // console.log(response.data);
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">

          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Employee Details
          </h2>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800/40 to-blue-800/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center items-center">
                <img
                  src={`http://localhost:5000/${employee.userId?.profileImage}`}
                  alt="Profile"
                  className="w-100 h-100 rounded-2xl object-cover border-4 border-cyan-500/30 shadow-lg shadow-cyan-500/20"
                />
              </div>
              <div className="space-y-6">
                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">Name</p>
                  <p className="text-white text-lg font-medium">{employee.userId?.name}</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">Employee ID</p>
                  <p className="text-white text-lg font-medium">{employee.employeeId}</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">Date Of Birth</p>
                  <p className="text-white text-lg font-medium">
                    {employee.dob && new Date(employee.dob).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">Gender</p>
                  <p className="text-white text-lg font-medium">{employee.gender}</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">Department</p>
                  <p className="text-white text-lg font-medium">{employee.department?.deptName}</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">Marital Status</p>
                  <p className="text-white text-lg font-medium">{employee.maritalStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default ViewEmployee;
