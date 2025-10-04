import {useState} from 'react'
import EmployeeSidebar from '../components/EmployeeDashboard/EmployeeSidebar';
import EmployeeSummary from '../components/EmployeeDashboard/EmployeeSummary';

const EmployeeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <EmployeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <main className="p-6">
          {/* Section title */}
          <EmployeeSummary />
        </main>
      </div>
    </div>
  )
}

export default EmployeeDashboard