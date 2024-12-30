import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);
  const [isDiscountApplicable, setisDiscountApplicable] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBookAppointment = async () => {
    try {
      const { data } = await axios.post("/api/v1/appointment/book", {
        doctorId: doctorData._id,
        patientId: localStorage.getItem("user-id"),
        fees: isDiscountApplicable ? doctorData.fees * 0.9 : doctorData.fees,
        isDiscount: isDiscountApplicable,
      });
      navigate("/patient-dashboard");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.post(`/api/v1/user/detail/${id}`, {
        userId: localStorage.getItem("user-id"),
      });
      setDoctorData(response?.data?.doctor);
      setisDiscountApplicable(response?.data?.isFirstTime);
    } catch (error) {
      console.log("Error fetching doctor details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: "600px",
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {doctorData?.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Profession: {doctorData?.profession}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {doctorData?.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Role: {doctorData?.role}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Fees:{" "}
        {isDiscountApplicable ? (
          <>
            <span
              style={{ textDecoration: "line-through", marginRight: "8px" }}
            >
              ₹{doctorData?.fees}
            </span>
            ₹ {doctorData.fees * 0.9}
            {/* ₹{doctorData?.discountedFees.toFixed(2)} */}
          </>
        ) : (
          <>₹{doctorData?.fees}</>
        )}
      </Typography>
      {isDiscountApplicable && (
        <Typography variant="body2" color="success.main">
          You will get a discount of 10% as a first-time consultation!
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleBookAppointment()}
      >
        Book Appointment
      </Button>
    </Box>
  );
};

export default BookAppointment;
