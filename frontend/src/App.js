import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";  // Import Sidebar
import Dashboard from "./components/Dashboard"; // Dashboard component
import Timer from "./components/Timer";  // Timer page
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Courses from "./components/Courses";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar - only visible on Dashboard */}
          <Routes>
            <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<RegisterPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/timer" element={<Timer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
