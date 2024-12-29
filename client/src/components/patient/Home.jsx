import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/api/v1/user/all-doctors");
        setDoctors(response?.data?.doctor);
      } catch (error) {
        console.log("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookAppointment = (doctorId) => {
    navigate(`/patient/book-appointment/${doctorId}`);
  };

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        List of Doctors
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {doctors.map((doctor) => (
          <Card
            key={doctor?._id}
            sx={{
              width: "300px",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6">{doctor?.name}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Fees : {doctor?.fees}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Role: {doctor?.role}
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBookAppointment(doctor?._id)}
            >
              Book Appointment
            </Button>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
