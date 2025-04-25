import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const url = "https://ems-backend-uc0w.onrender.com";

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(url+`/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.sucess) {
          setEmployee(response.data.employee);
        } else {
          setError(response.data.error || 'Failed to load employee');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Server error while fetching');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div>
      <h2>Employee Detail</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>DOB:</strong> {employee.dob}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default View;
