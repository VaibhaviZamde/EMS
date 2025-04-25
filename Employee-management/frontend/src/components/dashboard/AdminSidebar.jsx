import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">Employee MS</h3>
      </div>
      <div className="flex flex-col gap-2 mt-4 px-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : ""}flex items-center gap-3 py-2 px-3 hover:bg-teal-700 rounded`}
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : ""}flex items-center gap-3 py-2 px-3 hover:bg-teal-700 rounded`}
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : ""}flex items-center gap-3 py-2 px-3 hover:bg-teal-700 rounded`}
        >
          <FaBuilding />
          <span>Departments</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
