import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/auth/login", formData);
      console.log(data);
      localStorage.setItem("user-role", data?.role);
      localStorage.setItem("user-id", data?.id);
      if (data?.role === "patient") {
        navigate("/patient");
      } else {
        navigate("/doctor");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
  );
};

export default Login;
