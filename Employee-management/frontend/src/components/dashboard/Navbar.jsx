import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const { user, setUser } = useAuth(); // Ensure `setUser` is available
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    sessionStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className='flex items-center text-white justify-between h-12 bg-teal-600 px-5'>
      <p>Welcome {user?.name || 'User'}</p>
      <button
        onClick={handleLogout}
        className='px-4 py-1 bg-teal-700 hover:bg-teal-800 rounded'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
