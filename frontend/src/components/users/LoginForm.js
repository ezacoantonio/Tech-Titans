import React from 'react';
import { TextField, Button } from '@mui/material';

const LoginForm = ({ email, setEmail, password, setPassword, handleSubmit }) => {
    return (
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
        </form>
    );
};

export default LoginForm;
