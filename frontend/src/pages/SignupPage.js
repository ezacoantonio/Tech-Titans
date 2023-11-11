import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                navigate('/login'); // Redirect to login page after successful sign-up
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Display error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while signing up.');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
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
                <Button type="submit" variant="contained" color="primary">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignUpPage;
