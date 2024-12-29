const mongoose = require("mongoose");

exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("db connected successfully")
  } catch (error) {
    console.log("error in db connection");
  }
};
