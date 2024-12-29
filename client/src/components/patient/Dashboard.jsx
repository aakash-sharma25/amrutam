import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("user-id");
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/appointment/patient/${userId}`
        );
        setAppointments(data?.appointments);
        setBalance(data?.balance);
      } catch (error) {
        alert(error?.response?.data?.message);
      }
    };

    fetchDetails();
  }, []);

  const handleAddBalance = async () => {
    try {
      const response = await axios.put(
        `/api/v1/user/add-balance/${userId}`
      );
      setBalance(response.data.balance);
    } catch (error) {
      console.log("Error adding balance:", error);
    }
  };

  const columns = [
    {
      field: "doctorName",
      headerName: "Doctor Name",
      width: 200,
      renderCell: (params) => <p>{params?.row?.doctorId?.name}</p>,
    },
    { field: "date", headerName: "Date", width: 150 },
    { field: "fees", headerName: "Fees", width: 120 },
    { field: "isDiscount", headerName: "Discount Applied", width: 180 },
  ];

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Remaining Balance: ₹{balance}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddBalance}>
        Add ₹1000 to Balance
      </Button>

      <Box sx={{ height: 400, marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Appointment History
        </Typography>
        <DataGrid
          getRowId={(row) => row._id}
          rows={appointments}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
