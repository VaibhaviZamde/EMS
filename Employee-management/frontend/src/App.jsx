// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import PrivateRoutes from './utils/PrivateRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View.jsx';
import Logout from './pages/Logout';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> {/* <-- Add this line */}

      <Route path="/admin-dashboard" element={
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin"]}>
            <AdminDashboard />
          </RoleBaseRoutes>
        </PrivateRoutes>
      }>
        <Route index element={<AdminSummary />} />
        <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
        <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
        <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />
        <Route path="/admin-dashboard/employees" element={<List />} />
        <Route path="/admin-dashboard/add-employee" element={<Add />} />
        <Route path="/admin-dashboard/employee/:id" element={<View />} />
        <Route path="logout" element={<Logout />} />
      </Route>

      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
    </Routes>
  );
}

export default App;

