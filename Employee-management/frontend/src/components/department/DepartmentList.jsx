import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { getDepartmentColumns } from "../../utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);            // all fetched
  const [filteredDepartments, setFilteredDepartments] = useState([]); // what we show
  const [loading, setLoading] = useState(false);
  const url = "https://ems-backend-uc0w.onrender.com";

  // delete handler passed into columns factory
  const handleDelete = (id) => {
    const remaining = filteredDepartments.filter((dep) => dep._id !== id);
    setDepartments((all) => all.filter((d) => d._id !== id));
    setFilteredDepartments(remaining);
  };

  // fetch on mount
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url+"/api/department",
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (data.success) {
          let sno = 1;
          const list = data.departments.map((dep) => ({
            ...dep,
            sno: sno++,
          }));
          setDepartments(list);
          setFilteredDepartments(list);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // regenerate columns with current delete callback
  const columns = getDepartmentColumns(handleDelete);

  // filter on input change
  const handleFilter = (e) => {
    const q = e.target.value.toLowerCase();
    setFilteredDepartments(
      departments.filter((dep) => dep.dep_name.toLowerCase().includes(q))
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between items-center mb-4 px-4">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-1 border rounded"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Add New Department
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={filteredDepartments}
        pagination
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default DepartmentList;
