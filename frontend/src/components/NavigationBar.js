import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Switch from '@mui/material/Switch';
import useStyles from '../styles/NavigationAppBarStyles';
import Logout from './Logout'; 

export default function NavigationAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutSwitch, setLogoutSwitch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setAuth(true);
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate('/login');
    handleClose();
  };

  const handleSignup = () => {
    navigate('/signup');
    handleClose();
  };

  const handleLogoutSwitch = (event) => {
    setLogoutSwitch(event.target.checked);
    if (event.target.checked) {
      setAuth(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Titan Store
          </Typography>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {!auth && (
              <>
                <MenuItem onClick={handleLogin}>Login</MenuItem>
                <MenuItem onClick={handleSignup}>Signup</MenuItem>
              </>
            )}
            {auth && (
              <>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </>
            )}
          </Menu>
          {auth && (
            <>
              <Switch
                checked={logoutSwitch}
                onChange={handleLogoutSwitch}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      {logoutSwitch && <Logout />}
    </Box>
  );
}
