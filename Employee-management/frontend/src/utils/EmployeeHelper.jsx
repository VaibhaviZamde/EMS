import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

// Columns for DataTable
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center : "true"
  },
];

// Fetch department list
export const fetchAll = async (setLoading) => {
  let departments = [];
  try {
    setLoading(true);
    const { data } = await axios.get("http://localhost:5000/api/department", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (data.success) {
      departments = data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  } finally {
    setLoading(false);
  }
  return departments;
};

// Render employee action buttons
export const EmployeeButtons = ({ id, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Do you really want to delete this?")) return;
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/employee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) onDelete(id);
      else alert(data.error || "Delete failed");
    } catch (err) {
      alert(err.response?.data?.error || "Server error");
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-green-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${id}`)}
      >
        Edit
      </button>
      
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

// Utility to format employee data before rendering table
export const formatEmployees = (employees, onDelete) => {
  return employees.map((emp, idx) => ({
    sno: idx + 1,
    name: emp.user?.name || "N/A",
    profileImage: emp.profileImage,
    dep_name: emp.department?.name || "N/A",
    dob: emp.dob,
    action: <EmployeeButtons id={emp._id} onDelete={onDelete} />,
  }));
};
