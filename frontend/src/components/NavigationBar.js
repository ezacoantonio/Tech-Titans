import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import axios from "axios"; 
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
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomAlert from "./CustomAlert";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import SupervisorAccountIcon from "../../public/assets/blue-logo.png";

export default function NavigationAppBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const [editAccountPopupOpen, setEditAccountPopupOpen] = useState(false);
  const [editAccountData, setEditAccountData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // Include other user fields that need to be editable
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("userToken");
      setAuth(!!token);
      if (token) {
        const uniqueId = localStorage.getItem("uniqueId");
        fetchUserData(uniqueId);
      }
    };

    checkAuthStatus();

    // Listen for an 'authChange' event
    window.addEventListener("authChange", checkAuthStatus);

    // Cleanup
    return () => {
      window.removeEventListener("authChange", checkAuthStatus);
    };
  }, [location]); // Added location as a dependency

  const fetchUserData = async () => {
    try {
      const uniqueId = localStorage.getItem("_id");
      if (!uniqueId) {
        console.error("No user ID found in local storage");
        return;
      }
      const response = await fetch(
        `http://localhost:5000/users/profile/${uniqueId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
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
    window.dispatchEvent(new Event("authChange"));
  };

  const handleSearch = () => {
    navigate(`/homepage?search=${searchQuery}`);
  };

  const handleAdminDashboard = () => {
    navigate("/admin-dashboard");
  };


  const handleAccountEditOpen = () => {
    setEditAccountData({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        // Include other user fields as needed
    });
    setEditAccountPopupOpen(true);
};

const handleAccountSave = async () => {
  try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
          setAlert({ show: true, type: 'error', message: 'No user token found. Please log in.' });
          return;
      }

      await axios.put(`http://localhost:5000/users/update/${user._id}`, editAccountData, {
          headers: {
              'Authorization': `Bearer ${userToken}`
          }
      });

      setAlert({ show: true, type: 'success', message: "Account updated successfully!" });
      setEditAccountPopupOpen(false);

      // Navigate to the same route to effectively reload the current page
      navigate(0);
  } catch (error) {
      console.error('Error updating account:', error);
      setAlert({ show: true, type: 'error', message: 'Error updating account. Please try again.' });
  }
};

  return (
    <Box sx={{ flexGrow: 1 }}>
      {alert.show && (
        <CustomAlert
          showAlert={alert.show}
          alertMessage={alert.message}
          success={alert.type === "success"}
        />
      )}
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
              <img
                src="https://i.ibb.co/4jb5ChX/DALL-E-2023-11-26-15-19-50-A-vibrant-blue-logo-with-the-text-Titan-Store-underneath-The-logo-should.png"
                alt="Titan Store Logo"
                style={{
                  height: "50px",
                  borderRadius: "50%",
                  marginTop: "8px",
                }}
              />
            </Link>
          </Typography>
          {auth ? (
            <>
              <TextField
                label="Search Products"
                variant="outlined"
                size="small"
                sx={{ mr: 2, ml: "auto" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton
                size="large"
                edge="end"
                aria-label="account"
                color="inherit"
                onClick={handleAccountPopupOpen}
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={handleLogout}
                aria-label="logout"
              >
                <LogoutIcon />
              </IconButton>
              {/* <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button> */}
              <IconButton
                color="inherit"
                onClick={handleAdminDashboard}
                aria-label="admin dashboard"
              >
                <SupervisorAccountIcon />
              </IconButton>
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
                <Typography variant="body1">
                    <b>First Name:</b> {user.firstName}
                </Typography>
                <Typography variant="body1">
                    <b>Last Name:</b> {user.lastName}
                </Typography>
                <Typography variant="body1">
                    <b>Email:</b> {user.email}
                </Typography>
                <Typography variant="body1">
                    <b>Username:</b> {user.username}
                </Typography>
                <Typography variant="body1">
                    <b>Account Balance:</b> {user.accountBalance}
                </Typography>
                <Typography variant="body1">
                    <b>Role:</b> {user.role}
                </Typography>
                {/* Add more fields as needed */}
            </>
        ) : (
            <Typography>Loading user details...</Typography>
        )}
    </DialogContent>
    <DialogActions>
        <Button onClick={handleAccountEditOpen}>Edit</Button>
        <Button onClick={handleAccountPopupClose}>Close</Button>
    </DialogActions>
</Dialog>

{/* Edit Account Dialog */}
<Dialog open={editAccountPopupOpen} onClose={() => setEditAccountPopupOpen(false)}>
    <DialogTitle>Edit Account</DialogTitle>
    <DialogContent>
        <TextField
            label="First Name"
            fullWidth
            margin="dense"
            value={editAccountData.firstName}
            onChange={(e) => setEditAccountData({ ...editAccountData, firstName: e.target.value })}
        />
        <TextField
            label="Last Name"
            fullWidth
            margin="dense"
            value={editAccountData.lastName}
            onChange={(e) => setEditAccountData({ ...editAccountData, lastName: e.target.value })}
        />
        <TextField
            label="Username"
            fullWidth
            margin="dense"
            value={editAccountData.username}
            onChange={(e) => setEditAccountData({ ...editAccountData, username: e.target.value })}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setEditAccountPopupOpen(false)}>Cancel</Button>
        <Button onClick={handleAccountSave}>Save</Button>
    </DialogActions>
</Dialog>

    </Box>
  );
}
