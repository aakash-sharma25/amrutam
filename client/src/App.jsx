import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/patient/Home";
import BookAppointment from "./components/patient/BookAppointment";
import PatientDoctor from "./components/patient/Dashboard";
import Dashboard from "./components/doctor/Dashboard";
import Redirect from "./components/Redirect";
import { useEffect } from "react";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user-id");
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Redirect />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/patient" element={<Home />} />

      <Route
        path="/patient/book-appointment/:id"
        element={<BookAppointment />}
      />

      <Route path="/patient-dashboard" element={<PatientDoctor />} />
      <Route path="/doctor" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
