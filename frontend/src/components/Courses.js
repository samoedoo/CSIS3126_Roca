import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Courses = () => {
  // State to store courses
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState(""); // To store the new course name

  // Handle course name change
  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  // Add course to the list
  const handleAddCourse = () => {
    if (courseName.trim() !== "") {
      setCourses([...courses, courseName]);
      setCourseName(""); // Clear the input after adding
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4", borderRadius: "8px" }}>
      <h2>Courses</h2>

      {/* Form to add a course */}
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

      {/* List of courses */}
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
  );
};

export default Courses;
