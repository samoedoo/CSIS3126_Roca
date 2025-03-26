// Calendar.js
import React, { useState } from "react";
import Calendar from "react-calendar";  // Import the react-calendar component
import "react-calendar/dist/Calendar.css"; // Import the default calendar styles

const MyCalendar = () => {
  const [date, setDate] = useState(new Date()); // Track the currently selected date

  // Handle a change in the selected date
  const handleDateChange = (newDate) => {
    setDate(newDate); // Update the selected date when clicked
  };

  return (
    <div style={calendarContainerStyle}>
      <h2>📅 Your Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={date} // Bind the selected date to the calendar
      />
    </div>
  );
};

// Styling for the calendar container
const calendarContainerStyle = {
  padding: "20px",
  backgroundColor: "#f4f4f4", // Light background for the calendar container
  borderRadius: "8px",
  width: "100%", // Ensure it takes up available space
  maxWidth: "600px", // Optional: Max width for better responsiveness
  margin: "0 auto", // Center the calendar horizontally
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Add a subtle shadow for depth
};

export default MyCalendar;
