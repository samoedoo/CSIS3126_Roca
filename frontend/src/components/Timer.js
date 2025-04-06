// Timer.js
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../style/timer.css"

const Timer = (isLoggedIn, setIsLoggedIn) => {
  const [isPomodoro, setIsPomodoro] = useState(true);  // True for Pomodoro, False for Regular
  const [time, setTime] = useState(isPomodoro ? 25 * 60 : 5 * 60);  // Default to Pomodoro (25 minutes)
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Effect for updating the timer
  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(id);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Format time (minutes:seconds)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  // Switch between Pomodoro and Regular Timer
  const switchTimer = () => {
    setIsPomodoro(!isPomodoro);
    setTime(isPomodoro ? 5 * 60 : 25 * 60);  // Reset to the appropriate timer
    setIsRunning(false); // Stop the timer when switching
  };

  // Start/Pause the timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset the timer
  const resetTimer = () => {
    setTime(isPomodoro ? 25 * 60 : 5 * 60);  // Reset to default time based on the selected timer
    setIsRunning(false);
  };

  return (
    <>
    {isLoggedIn && window.location.pathname === "/timer" && <Sidebar />}
    <div className="timerContainerStyle"> 
      <div className="inner_box">
      <h2>{isPomodoro ? "Pomodoro Timer" : "Regular Timer"}</h2>
      <div style={timerDisplayStyle}>{formatTime(time)}</div>

      <div style={buttonContainerStyle}>
        <button className="action-button" onClick={toggleTimer} style={buttonStyle}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="action-button" onClick={resetTimer} style={buttonStyle}>
          Reset
        </button>
        <button className="action-button" onClick={switchTimer} style={buttonStyle}>
          Switch to {isPomodoro ? "Regular" : "Pomodoro"} Timer
        </button>
      </div>
      </div>
    </div>
    </>
  );
};

// Styling for the Timer Component
const timerContainerStyle = {
  backgroundColor: "#f0f8ff",
  padding: "20px",
  borderRadius: "10px",
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  textAlign: "center",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  marginLeft:"290px"
};

const timerDisplayStyle = {
  fontSize: "48px",
  fontWeight: "bold",
  margin: "20px 0",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  gap: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Timer;
