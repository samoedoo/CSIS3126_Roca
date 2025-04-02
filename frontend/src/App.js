import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";  // Import Sidebar
import Dashboard from "./components/Dashboard"; // Dashboard component
import Timer from "./components/Timer";  // Timer page
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar - only visible on Dashboard */}
        {isLoggedIn && window.location.pathname === "/dashboard" && <Sidebar />}
        {isLoggedIn && window.location.pathname === "/courses" && <Sidebar />}
        {isLoggedIn && window.location.pathname === "/timer" && <Sidebar />}
        
        <div style={{ marginLeft: isLoggedIn && window.location.pathname === "/dashboard" ? "250px" : "0", flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timer" element={<Timer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
