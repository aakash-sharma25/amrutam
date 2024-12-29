import { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "patient",
    profession: null,
    password: "",
    fees: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/auth/register", formData);
      // console.log(data);
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.message);
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
        Signup
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
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
      <TextField
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        select
        fullWidth
        required
        margin="normal"
      >
        <MenuItem value="patient">Patient</MenuItem>
        <MenuItem value="doctor">Doctor</MenuItem>
      </TextField>
      {formData.role === "doctor" && (
        <TextField
          label="Profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
      )}
      {formData.role === "doctor" && (
        <TextField
          label="Fees"
          name="fees"
          value={formData.fees}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
      )}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Signup
      </Button>
      <Typography textAlign={"center"}>
        Already have an Account ?<Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
};

export default Register;
