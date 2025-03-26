// Dashboard.js
import React from "react";
import MyCalendar from "./Calendar";  // Import the Calendar component

const Dashboard = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Main Content */}
      <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
        <h1>Welcome to the Dashboard!</h1>
        <p>This is the page after logging in.</p>

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
