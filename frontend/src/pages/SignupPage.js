import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/users/SignupForm';
import CustomAlert from '../components/CustomAlert';
import Loading from '../components/Loading';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            setLoading(false);
            if (response.ok) {
                setAlert({ show: true, type: 'success', message: 'Account created successfully!' });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                // const errorData = await response.json();
                setAlert({ show: true, type: 'error', message: "Please revise your Credentials" });
            }
        } catch (error) {
            setLoading(false);
            setAlert({ show: true, type: 'error', message: 'An error occurred while signing up.' });
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
                <h1>Sign Up</h1>
                <SignupForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
                {loading && <Loading />}
                {alert.show && <CustomAlert showAlert={alert.show} alertMessage={alert.message} success={alert.type === 'success'} />}
            </Box>
        </Container>
    );
};

export default SignUpPage;
