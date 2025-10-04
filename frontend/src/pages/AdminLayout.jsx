import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Dashboard/AdminSidebar";
import Navbar from "../components/Dashboard/Navbar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0 md:ml-64"
        }`}
      >
        {/* <Navbar /> */}
        <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Page content under navbar */}
        <main className="pt-20 px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
