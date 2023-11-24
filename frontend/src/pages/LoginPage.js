import React, { useState } from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/users/LoginForm';
import Alert from '../components/CustomAlert';
import Loading from '../components/Loading';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/homepage";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/users/login', { email, password });
            setLoading(false);
            if (response.status === 200) {
                localStorage.setItem('userToken', response.data.token);
                // console.log(response.data.token);
                localStorage.setItem('_id', response.data.user._id); // Corrected to access _id from user object
                // Corrected to access _id from user object
                localStorage.setItem('accountBalance', response.data.user.accountBalance);
                console.log(response.data.user.accountBalance); 
                setAlert({ show: true, type: 'success', message: 'Login successful!' });
                console.log('Login successful!');
                setTimeout(() => navigate(from, { replace: true }), 100);
            }else {
                setAlert({ show: true, type: 'error', message: 'Invalid credentials' });
                console.log('Login failed: Invalid credentials');
            }
        } catch (error) {
            setLoading(false);
            setAlert({ show: true, type: 'error', message: 'Login failed: Invalid credentials' });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h1>Login</h1>
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleSubmit={handleSubmit}
                />
                {loading && <Loading />}
                {alert.show && <Alert type={alert.type} message={alert.message} />}
            </Box>
        </Container>
    );
};

export default LoginPage;
