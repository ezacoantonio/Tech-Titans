import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/CustomAlert';
import Loading from '../components/Loading';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/users/login', { email, password });
            setLoading(false);
            if (response.status === 200) {
                setAlert({ show: true, type: 'success', message: 'Login successful!' });
                setTimeout(() => navigate('/dashboard'), 2000); // Redirect to dashboard after 3 seconds
            } else {
                setAlert({ show: true, type: 'error', message: 'Invalid credentials' });
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
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        fullWidth
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        fullWidth
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                    {loading && <Loading />}
                </form>
                {alert.show && <Alert type={alert.type} message={alert.message} />}
            </Box>
        </Container>
    );
};

export default LoginPage;
