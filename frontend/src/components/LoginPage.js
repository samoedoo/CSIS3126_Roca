import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/auth.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username && password) {
      // Send login request to backend API
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.status === 200) {
        console.log(data.message);
        setIsLoggedIn(true); // Set the user as logged in
        navigate("/dashboard"); // Navigate to dashboard
      } else {
        alert(data.message); // Show error message
      }
    } else {
      alert("Please fill in both username and password!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form_box">
          <label style={{marginRight:"10px"}}>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form_box">
          <label style={{marginRight:"10px"}}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="action-button" type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginPage;
