import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const userId = localStorage.getItem("user-id");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/appointment/doctor/${userId}`
        );
        setTransactions(data?.appointments);
        setBalance(data?.balance);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Columns for the Data Grid
  const columns = [
    // { field: "id", headerName: "ID", width: 100 },
    {
      field: "patienID",
      headerName: "Patient Name",
      width: 200,
      renderCell: (params) => <p>{params?.row?.patientId?.name}</p>,
    },
    { field: "date", headerName: "Date", width: 150 },
    { field: "fees", headerName: "Fees", width: 120 },
    { field: "isDiscount", headerName: "Is Discount", width: 200 },
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
        Your Balance: ₹{balance}
      </Typography>

      <Box sx={{ height: 400, marginTop: 4 }}>
        <DataGrid
          rows={transactions}
          getRowId={(row) => row?._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
