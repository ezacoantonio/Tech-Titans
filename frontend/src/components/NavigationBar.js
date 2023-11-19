import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useStyles from "../styles/NavigationAppBarStyles";

export default function NavigationAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("userToken");
      setAuth(!!token);
      if (token) {
        const userId = localStorage.getItem("userId");
        fetchUserData(userId);
      }
    };

    // Listen for an 'authChange' event
    window.addEventListener('authChange', checkAuthStatus);

    // Initial check
    checkAuthStatus();

    // Cleanup
    return () => {
      window.removeEventListener('authChange', checkAuthStatus);
    };
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/profile/${userId}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccountPopupOpen = () => {
    setAccountPopupOpen(true);
  };

  const handleAccountPopupClose = () => {
    setAccountPopupOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    handleClose();
    window.location.reload();
  };

  const handleSignup = () => {
    navigate("/signup");
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setAuth(false);
    navigate("/login");
    window.dispatchEvent(new Event('authChange'));
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
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Titan Store
            </Link>
          </Typography>
          {auth ? (
            <>
              <IconButton
                size="large"
                edge="end"
                aria-label="account"
                color="inherit"
                onClick={handleAccountPopupOpen}
              >
                <AccountCircle />
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem key="login" onClick={handleLogin}>
                Login
              </MenuItem>
              <MenuItem key="signup" onClick={handleSignup}>
                Signup
              </MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>

      {/* Account Popup Dialog */}
      <Dialog open={accountPopupOpen} onClose={handleAccountPopupClose}>
        <DialogTitle>Account Details</DialogTitle>
        <DialogContent>
          {user ? (
            <>
              <Typography variant="body1"><b>First Name:</b> {user.firstName}</Typography>
              <Typography variant="body1"><b>Last Name:</b> {user.lastName}</Typography>
              <Typography variant="body1"><b>Email:</b> {user.email}</Typography>
              <Typography variant="body1"><b>Username:</b> {user.username}</Typography>
              <Typography variant="body1"><b>Account Balance:</b> {user.accountBalance}</Typography>
              <Typography variant="body1"><b>Role:</b> {user.role}</Typography>
              {/* Add more fields as needed */}
            </>
          ) : (
            <Typography>Loading user details...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccountPopupClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
