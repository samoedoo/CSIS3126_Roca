import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

// Set default base URL for Axios
axios.defaults.baseURL = "http://127.0.0.1:5000";

const Courses = ({ isLoggedIn, setIsLoggedIn }) => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    axios
      .get("/api/courses?user_id=1") // Replace 1 with actual user ID when login is integrated
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleAddCourse = () => {
    if (courseName.trim() !== "") {
      const newCourse = { name: courseName, user_id: 1 }; // Replace with actual user ID
      axios
        .post("/api/courses", newCourse)
        .then((res) => {
          setCourses([...courses, newCourse]);
          setCourseName("");
        })
        .catch((error) => console.error("Error adding course:", error));
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
                {course.name || course}
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
