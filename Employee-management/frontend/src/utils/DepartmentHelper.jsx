import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// still OK to export a plain component
export const DepartmentButtons = ({ id, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Do you really want to delete this?")) return;
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/department/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

// **Factory** that returns a fresh columns array each render
export function getDepartmentColumns(onDelete) {
  return [
    {
      name: "S No",
      selector: (row) => row.sno,
      width: "80px",
    },
    {
      name: "Department Name",
      selector: (row) => row.dep_name,
    },
    {
      name: "Action",
      // cell is allowed inside this factory function
      cell: (row) => (
        <DepartmentButtons id={row._id} onDelete={onDelete} />
      ),
      ignoreRowClick: true,      // so clicking buttons won’t trigger row click
      allowOverflow: true,
    },
  ];
}
