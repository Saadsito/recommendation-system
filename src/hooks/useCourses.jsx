import React, { createContext, useState, useEffect, useContext } from "react";

const CoursesContext = createContext();

export const useCoursesContext = () => {
  return useContext(CoursesContext);
};

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/recommendation", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCourses(data.data);
      } else {
        console.error("Error al obtener los cursos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && courses.length === 0) {
      fetchCourses(token);
    }
  }, [courses]);

  return (
    <CoursesContext.Provider value={{ courses, loading }}>
      {children}
    </CoursesContext.Provider>
  );
};
