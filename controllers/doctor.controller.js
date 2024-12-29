const Appointment = require("../models/appointment.model");
const User = require("../models/user.model");

exports.getAllDoctors = async (req, res) => {
  try {
    const doctor = await User.find({ role: "doctor" });

    return res.status(200).json({
      success: true,
      message: "All doctor fetched successfully",
      doctor,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching all doctor",
      error: error.message,
    });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const { userId } = req.body;
    const { doctorId } = req.params;

    if(!userId || !doctorId) {
      return res.status(400).json({
        success: false,
        message: "all field is required",
      });
    }

    const doctor = await User.findById(doctorId);

    const pair = await Appointment.findOne({
      doctorId,
      patientId: userId,
      isDiscount: true,
    });
    const isFirstTime = pair ? false : true;
    
    return res.status(200).json({
      success: true,
      message: " doctor fetched successfully",
      doctor,
      isFirstTime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching  doctor",
      error: error.message,
    });
  }
};

exports.addBalance = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.balance += 1000;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Balance added successfully",
      balance: user.balance,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
