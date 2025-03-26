import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "250px", // Sidebar width
        backgroundColor: "#006400", // Dark green background
        color: "white",
        padding: "20px",
        position: "fixed", // Keep sidebar fixed on the screen
        height: "100vh", // Full height of the viewport
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Space out the buttons
      }}
    >
      <div style={{ paddingBottom: "10px", textAlign: "center" }}>
        <h3>Study Planner</h3>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/dashboard">
          <button
            style={{
              backgroundColor: "#006400", // Green background
              color: "white",
              border: "2px solid #003d00", // Darker green border
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Dashboard
          </button>
        </Link>
        <Link to="/courses"> {/* Change the link to '/courses' */}
          <button
            style={{
              backgroundColor: "#006400", // Green background
              color: "white",
              border: "2px solid #003d00", // Darker green border
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Courses {/* Update the button text */}
          </button>
        </Link>
        <Link to="/timer">
          <button
            style={{
              backgroundColor: "#006400", // Green background
              color: "white",
              border: "2px solid #003d00", // Darker green border
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Timer
          </button>
        </Link>
      </div>
      
      <div style={{ marginTop: "auto" }}>
        {/* Any footer or logout button could go here */}
      </div>
    </div>
  );
};

export default Sidebar;
