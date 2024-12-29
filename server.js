const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const appointmentRoutes = require("./routes/appointment.route");

const { dbConnect } = require("./utils/dbConnect");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

dbConnect();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/appointment", appointmentRoutes); 

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(express.static(path.join(__dirname, "./client/dist")))

app.get( "*" , (req,res) =>{
    res.sendFile(path.join(__dirname , "./client/dist/index.html"))
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
