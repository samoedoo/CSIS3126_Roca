import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/auth.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, confirm_password: confirmPassword }),
    });

    const data = await response.json();

    if (response.status === 201) {
      alert("Registration successful! Please log in.");
      navigate("/login"); // Redirect to login page after successful registration
    } else {
      alert(data.message); // Show error message
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form_box">
          <label style={{marginRight:"10px"}}>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form_box">
          <label style={{marginRight:"10px"}}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form_box">
          <label style={{marginRight:"10px"}}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="action-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
