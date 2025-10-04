import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./pages/AdminLayout";
import AdminLeave from "./pages/AdminLeave";
import AdminSettings from "./pages/AdminSettings";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import EmployeeLayout from "./pages/EmployeeLayout";
import EmployeeSummary from "./components/EmployeeDashboard/EmployeeSummary";
import AdminSummary from "./components/dashboard/AdminSummary";
import LeaveList from "./components/leave/LeaveList";
import AddLeave from "./components/leave/AddLeave";
import EmployeeSetting from "./components/EmployeeDashboard/EmployeeSetting";
import LeaveDetails from "./components/leave/LeaveDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />

        {/* Admin layout with nested routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminLayout />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="employee" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="employee/:id" element={<ViewEmployee />} />
          <Route path="employee/edit/:id" element={<EditEmployee />} />
          <Route path="employee/salary/:id" element={<ViewSalary />} />
          <Route path="department" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="leave" element={<AdminLeave />} />
          <Route path="leave/:id" element={<LeaveDetails />} />
          <Route path="employee/leave/:id" element={<LeaveList />} />
          <Route path="salary">
            <Route index element={<Navigate to="add" />} />
            <Route path="add" element={<AddSalary />} />
          </Route>
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Employee layout with nested routes */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["employee","admin"]}>
                <EmployeeLayout />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<EmployeeSummary />} />
          <Route path="profile/:id" element={<ViewEmployee />} />
          <Route path="leaves" element={<LeaveList />} /> {/* Corrected */}
          <Route path="add-leave" element={<AddLeave />} />
          <Route path="salary/:id" element={<ViewSalary />} />
          <Route path="setting" element={<EmployeeSetting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
