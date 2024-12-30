const User = require("../models/user.model");

exports.registerController = async (req, res) => {
  try {
    const { email, password, name, role, profession, fees } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all field is required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(404).json({
        success: true,
        message: "User is already registered",
      });
    }
    const user = await User.create({
      name,
      balance: role === "doctor" ? 0 : 1000,
      email,
      password,
      role,
      profession,
      fees,
    });
    return res.status(200).json({
      success: true,
      message: "user registerd successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in registrstion",
      error: error.message,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({
        success: false,
        message: "please fill all field",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email is not registered",
      });
    }

    const isPasswardValid = await user.isPasswordCorrect(password);

    if (!isPasswardValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password please enter correct password",
      });
    }
    const accessToken = await user.generateAccessToken();

    const options = {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    };

    const loggedInUser = await User.findById(user._id);

    return res.status(200).cookie("accessToken", accessToken, options).json({
      success: true,
      message: "User login successfull",
      role: loggedInUser.role,
      token: accessToken,
      id: loggedInUser._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,

      message: "error in login",
      error: error.message,
    });
  }
};