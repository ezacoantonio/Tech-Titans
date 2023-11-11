import React, { useState } from 'react';
import { TextField, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
                setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 3 seconds
            } else {
                const errorData = await response.json();
                setAlert({ show: true, type: 'error', message: errorData.message });
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
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    {loading && <Loading />}
                </form>
                {alert.show && <CustomAlert showAlert={alert.show} alertMessage={alert.message} success={alert.type === 'success'} />}
            </Box>
        </Container>
    );
};

export default SignUpPage;
