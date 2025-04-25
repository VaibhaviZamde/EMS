// pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Logout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    sessionStorage.clear();
    setUser(null);
    navigate('/login');
  }, [setUser, navigate]);

  return null; // or a "Logging out..." spinner
};

export default Logout;
