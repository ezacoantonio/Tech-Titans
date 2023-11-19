import React from 'react';
import { TextField, Button } from '@mui/material';

const SignupForm = ({ formData, handleChange, handleSubmit }) => {
    return (
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
        </form>
    );
};

export default SignupForm;
