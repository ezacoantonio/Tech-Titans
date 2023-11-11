import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user token/session from localStorage
        localStorage.removeItem('userToken'); // Replace 'userToken' with the actual key you use

        // Redirect to login page
        navigate('/login');
    }, [navigate]);

    return null; // This component does not render anything
};

export default Logout;
