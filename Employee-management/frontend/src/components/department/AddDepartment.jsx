import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: '',
    description: ''
  });
  const url = "https://ems-backend-uc0w.onrender.com"
  const navigate  = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url+'/api/department/add', department, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });      
      if(response.data.success){
        navigate("/admin-dashboard/departments")
      }
    } catch (error) {
      console.log("❌ Error response:", error.response);
alert(error.response?.data?.error || 'Failed to add department');

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Add New Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Department Name</label>
            <input
              type="text"
              name="dep_name"
              placeholder="Department Name"
              value={department.dep_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={department.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 font-semibold"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
