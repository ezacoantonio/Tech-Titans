import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    E-commerce Store
                </Typography>
                <Button color="inherit" component={Link} to="/signup">
                    Sign Up
                </Button>
                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
