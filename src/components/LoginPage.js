// components/AdminLoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import'./LoginPage.css'
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleLogin}>
      <h2>Admin Login</h2>

        <div>
          <label>Username</label>
          <p></p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
                    <p></p>

        </div>
        <div>
          <label>Password</label>
          <p></p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p></p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
