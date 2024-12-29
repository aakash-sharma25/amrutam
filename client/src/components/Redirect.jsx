import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user-id");
    if (user) {
      navigate("/" + localStorage.getItem("user-role"));
    } else {
      navigate("/login");
    }
  }, []);
  return <div>Redirect to your dashboard</div>;
}
