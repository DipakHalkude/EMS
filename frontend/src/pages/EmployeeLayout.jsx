import { useState } from "react";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/EmployeeDashboard/EmployeeSidebar";
import Navbar from "../components/dashboard/Navbar";

const EmployeeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <EmployeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0 md:ml-64"
        }`}
      >
        {/* Navbar */}
        <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Page content under navbar */}
        <main className="pt-20 px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
