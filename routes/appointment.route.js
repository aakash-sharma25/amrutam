const express = require("express");
const {
  bookAppointment,
  getAppointmentsByPatient,
  getTransactionsByDoctor,
} = require("../controllers/appointment.controller");

const router = express.Router();

router.post("/book", bookAppointment);

router.get("/patient/:userId", getAppointmentsByPatient);

router.get("/doctor/:userId", getTransactionsByDoctor);

module.exports = router;
