import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Get the user role from localStorage
  const userRole = localStorage.getItem("user-role");

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user-role");
    localStorage.removeItem("user-id");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Amrutam
        </Typography>
        <Box>
          {userRole === "patient" && (
            <>
              <Button color="inherit" onClick={() => navigate("/patient")}>
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/patient-dashboard")}
              >
                Dashboard
              </Button>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {userRole === "doctor" && (
            <>
              <Button color="inherit" onClick={() => navigate("/doctor")}>
                Dashboard
              </Button>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {!userRole && (
            <>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Signup
              </Button>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
