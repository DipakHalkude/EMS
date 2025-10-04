import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/Dashboard/AdminSidebar";
// import Navbar from "../components/Dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <main className="p-6">
          {/* Section title */}
          <AdminSummary />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
