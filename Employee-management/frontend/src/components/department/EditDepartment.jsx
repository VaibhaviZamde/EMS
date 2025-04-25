import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
  const { id } = useParams();

  // Initialize with an object so you never render null fields
  const [department, setDepartment] = useState({
    dep_name: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDepartment = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        if (response.data.success) {
          setDepartment(response.data.department);
        } else {
          setError(response.data.error || 'Failed to load department');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Server error while fetching');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((dept) => ({ ...dept, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.put(
        `http://localhost:5000/api/department/${id}`,
        {
          dep_name: department.dep_name,
          description: department.description
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.data.success) {
        // your controller returns { success: true, updateDep }
        alert('Department updated successfully!');
        navigate("/admin-dashboard/departments")
      } else {
        setError(response.data.error || 'Update failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error while updating');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error)   return <div className="text-red-600">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Edit Department</h2>
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
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 font-semibold disabled:opacity-50"
          >
            {loading ? 'Saving…' : 'Edit Department'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
