// src/components/AdminLoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from "../components/AuthContext";
import { TextField, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { auth } from "../firebase"; // Make sure to import auth from the correct path
import "./LoginPage.css"
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const { login } = useAuth(); // Access login function from context
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/admin/dashboard"); // Redirect to the dashboard on successful login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  // Handle password reset
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first to reset the password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError("Error sending password reset email. Please try again.");
    }
  };

  return (
    <div className="container">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Login
        </Typography>
        <Box mb={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
        <div className="forgot-password">
          <p onClick={handleForgotPassword} style={{ cursor: "pointer", color: "blue" }}>
            Forgot Password?
          </p>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {resetMessage && <p style={{ color: "green" }}>{resetMessage}</p>}
      </motion.div>
    </div>
  );
};

export default LoginPage;
