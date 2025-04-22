// Dashboard.js
import React from "react";
import MyCalendar from "./Calendar";  // Import the Calendar component
import Sidebar from "./Sidebar";

const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", justifyContent: "space-between", width:"100%" }}>
      {isLoggedIn && window.location.pathname === "/dashboard" && <Sidebar />}
      {/* Main Content */}
      <div style={{ marginLeft: "560px", padding: "40px" , margin:"auto" }}>
        <h1>Welcome to your study planner!</h1>
        <p>Lets not forget anything!</p>

        {/* Calendar */}
        <div style={calendarContainerStyle}>
          <MyCalendar />
        </div>
      </div>
    </div>
  );
};

// Styling for the calendar container in the dashboard
const calendarContainerStyle = {
  backgroundColor: "#f0f8ff", // Light blue background for the calendar container
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  maxWidth: "800px", // Optional: Max width for better responsiveness
  margin: "0 auto", // Center the calendar horizontally
};

export default Dashboard;
