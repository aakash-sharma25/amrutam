const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["doctor", "patient"],
      default: "patient",
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profession: {
      type: String,
      default: "-",
    },
    fees: { type: Number, default: null },
    balance: { type: Number, default: null },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
module.exports = mongoose.model("User", userSchema);
