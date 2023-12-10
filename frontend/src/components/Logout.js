import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('_id');
    localStorage.removeItem('accountBalance');
    localStorage.removeItem('uniqueId');
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
