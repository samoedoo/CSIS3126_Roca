import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"

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
          <button className="sidebar-button">
            Dashboard
          </button>
        </Link>
        <Link to="/courses"> {/* Change the link to '/courses' */}
          <button className="sidebar-button" >
            Courses {/* Update the button text */}
          </button>
        </Link>
        <Link to="/timer">
          <button className="sidebar-button">
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
