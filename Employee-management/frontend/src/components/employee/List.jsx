import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter employees by name or ID
  const filterEmployees = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(value) || emp._id.toLowerCase().includes(value)
    );
    setFilteredEmployees(filtered);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (data.success) {
          const list = data.employees.map((emp, index) => ({
            _id: emp._id,
            sno: index + 1,
            name: emp.userId?.name || 'N/A',
            dob: new Date(emp.dob).toDateString(),
            dep_name: emp.department?.dep_name || 'N/A',
            profileImage: emp.userId?.profileImage || 'default.jpg',
            action: (<EmployeeButtons Id={emp._id} onDelete={handleDelete} />),
          }));
  
          setEmployees(data.employees);
          setFilteredEmployees(list);
        } else {
          console.error('Failed to fetch employees');
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEmployees();
  }, []);
  

  const handleDelete = (id) => {
    // Filter out the deleted employee from the employees state
    const updatedEmployees = employees.filter((emp) => emp._id !== id);
    setEmployees(updatedEmployees);

    // Update the filtered employees state with the new list
    const updatedFilteredEmployees = updatedEmployees.map((emp, index) => ({
      _id: emp._id,
      sno: index + 1,  // Adjust sno after deletion
      name: emp.userId?.name || 'N/A',
      dob: new Date(emp.dob).toDateString(),
      dep_name: emp.department?.dep_name || 'N/A',
      profileImage: emp.userId?.profileImage || 'default.jpg',
      action: (<EmployeeButtons Id={emp._id} onDelete={handleDelete} />),
    }));
    setFilteredEmployees(updatedFilteredEmployees);
  };

  return (
    <div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>

      <div className="flex justify-between items-center my-4 px-4">
        <input
          type="text"
          placeholder="Search by Employee Name or ID"
          className="px-4 py-0.5 border rounded"
          onChange={filterEmployees}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Add New Employee
        </Link>
      </div>
      
      <div>
        <DataTable columns={columns} data={filteredEmployees} />
      </div>
    </div>
  );
};

export default List;
