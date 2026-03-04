
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Register page now redirects to the combined Login/Register page
// and auto-toggles to the signup panel
const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Pass state to Login to auto-toggle to register form
    navigate("/login", { state: { showRegister: true } });
  }, [navigate]);

  return null;
};

export default Register;