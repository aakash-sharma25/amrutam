const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: "true",
    },
    fees: { type: Number, required: true },
    isDiscount: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
