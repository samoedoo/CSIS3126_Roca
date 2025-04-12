import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const Courses = ({ isLoggedIn, setIsLoggedIn }) => {
  // Load courses from localStorage on initial render
  const [courses, setCourses] = useState(() => {
    const stored = localStorage.getItem("courses");
    return stored ? JSON.parse(stored) : [];
  });

  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    // Save courses to localStorage whenever they change
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleAddCourse = () => {
    if (courseName.trim() !== "") {
      setCourses([...courses, courseName]);
      setCourseName("");
    }
  };

  return (
    <>
      {isLoggedIn && window.location.pathname === "/courses" && <Sidebar />}

      <div style={{ padding: "20px", backgroundColor: "#f4f4f4", borderRadius: "8px", marginLeft: "300px" }}>
        <h2>Courses</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter course name"
            value={courseName}
            onChange={handleCourseNameChange}
            style={{
              padding: "10px",
              fontSize: "16px",
              marginRight: "10px",
              width: "250px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
          <button
            onClick={handleAddCourse}
            style={{
              padding: "10px 20px",
              backgroundColor: "#006400",
              color: "white",
              border: "2px solid #003d00",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Course
          </button>
        </div>

        {courses.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {courses.map((course, index) => (
              <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {course}
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses added yet.</p>
        )}
      </div>
    </>
  );
};

export default Courses;
