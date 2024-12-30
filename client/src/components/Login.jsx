import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  getImageListItemBarUtilityClass,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (type) => {
    // e.preventDefault();
    let loginCredential = {
      email: "",
      password: "",
    };
    try {
      if (type === "doctor") {
        loginCredential = {
          email: "doctor@doctor.com",
          password: "guestdoctor",
        };
      } else if (type === "patient") {
        loginCredential = {
          email: "user@user.com",
          password: "guestpatient",
        };
      } else {
        loginCredential = formData;
      }

      const { data } = await axios.post("/api/v1/auth/login", loginCredential);

      localStorage.setItem("user-role", data?.role);
      localStorage.setItem("user-id", data?.id);
      if (data?.role === "patient") {
        navigate("/patient");
      } else {
        navigate("/doctor");
      }
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          margin: "auto",
          padding: 4,
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          fullWidth
          required
          margin="normal"
        />
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
          <Button
            variant="contained"
            size="sm"
            onClick={() => handleSubmit("patient")}
            color="success"
            fullWidth
          >
            Login as guest patient
          </Button>
          <Button
            variant="contained"
            size="sm"
            onClick={() => handleSubmit("doctor")}
            color="success"
            fullWidth
          >
            Login as guest doctor
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
