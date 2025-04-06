import React from "react";
import { Link } from "react-router-dom";
import "../style/sidebar.css"

const Sidebar = () => {
  return (
    <div className={` ${window.location.pathname === "/login"  || window.location.pathname === "/register" ? "hideSidebar":"showSidebar" } sidebar-container`}
    >
      <div >
        <h3 style={{ paddingBottom: "10px",  }}>Study Planner</h3>
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
      </div>
      
      
      <div >
        {/* Any footer or logout button could go here */}
        <Link to="/login"> 
        <button className="logout">Logout</button>
        </Link>
        
      </div>
    </div>
  );
};

export default Sidebar;
