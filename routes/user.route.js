const express = require("express");
const {
  getAllDoctors,
  getDoctorById,
  addBalance,
} = require("../controllers/doctor.controller");

const router = express.Router();

router.get("/all-doctors", getAllDoctors);

router.put("/add-balance/:userId", addBalance);

router.post("/detail/:doctorId", getDoctorById);

module.exports = router;
