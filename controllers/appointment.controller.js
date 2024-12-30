const { default: mongoose } = require("mongoose");
const Appointment = require("../models/appointment.model");
const User = require("../models/user.model");
const moment = require("moment");

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, fees, isDiscount } = req.body;

    if (!doctorId || !patientId || !fees || !isDiscount) {
      return res.status(400).json({
        success: false,
        message: "all field is required",
      });
    }

    const patient = await User.findById(patientId);

    if (patient.balance < fees) {
      return res.status(404).json({
        success: false,
        message: "Not Enough Balance",
      });
    }

    const doctor = await User.findById(doctorId);

    const appointment = await Appointment.create({
      patientId: new mongoose.Types.ObjectId(patientId),
      doctorId: new mongoose.Types.ObjectId(doctorId),
      fees: fees,
      isDiscount: isDiscount,
      date: moment().format("DD-MM-YYYY"),
    });

    patient.balance = patient.balance - fees;
    doctor.balance = doctor.balance + fees;

    await patient.save();
    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Appointment Booked successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in booking appointment",
      error: error.message,
    });
  }
};

exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({ patientId: userId })
      .populate("doctorId", "name")
      .sort({ createdAt: -1 });

    const balance = await User.findById(userId).select("balance");

    return res.status(200).json({
      success: true,
      message: "all transaction fetched successfully",
      appointments,
      balance: balance.balance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching all transaction",
      error: error.message,
    });
  }
};

exports.getTransactionsByDoctor = async (req, res) => {
  try {
    const { userId } = req.params;
    const balance = await User.findById(userId).select("balance");
    const appointments = await Appointment.find({ doctorId: userId }).populate(
      "patientId",
      "name"
    );
    return res.status(200).json({
      message: "success",
      appointments,
      balance: balance.balance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
