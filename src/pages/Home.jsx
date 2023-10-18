import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import { Box, CircularProgress, Typography } from "@mui/material";
import CourseDescription from "../components/CourseDescription";
import CardCourse from "../components/CardCourse";
import { Masonry } from "@mui/lab";

const Home = () => {
  const [searchCourse, setSearchCourse] = useState("");
  const [valueFilterUniversities, setValueFilterUniversities] = useState([]);
  const [valueFilterCareers, setValueFilterCareers] = useState([]);
  const [valueFilterLevel, setValueFilterLevel] = useState(0);
  const [valueFilterFavorites, setValueFilterFavorites] = useState(false);

  const [courses, setCourses] = useState([]);

  const [courseDescription, setCourseDescription] = useState(null);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchCourses = async () => {
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

    if (token) {
      fetchCourses();
    }
  }, [token]);

  return (
    <Box>
      <Header />
      <Box sx={{ display: "inline-flex", width: "100%" }}>
        <Filter
          searchCourse={searchCourse}
          setSearchCourse={setSearchCourse}
          valueFilterUniversities={valueFilterUniversities}
          setValueFilterUniversities={setValueFilterUniversities}
          valueFilterCareers={valueFilterCareers}
          setValueFilterCareers={setValueFilterCareers}
          valueFilterLevel={valueFilterLevel}
          setValueFilterLevel={setValueFilterLevel}
          valueFilterFavorites={valueFilterFavorites}
          setValueFilterFavorites={setValueFilterFavorites}
        />
        <Box
          flexGrow={1}
          sx={{
            backgroundColor: "#f6f6f6",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "auto",
            maxHeight: "calc(100vh - 64px)",
          }}
        >
          {courses.length !== 0 ? (
            courses
              .filter((data) => {
                if (searchCourse === "") {
                  return data;
                } else if (
                  data.title.toLowerCase().includes(searchCourse.toLowerCase())
                ) {
                  return data;
                }
              })
              .filter((data) => {
                // Filtrar por las carreras seleccionadas solo si hay carreras seleccionadas
                if (valueFilterCareers.length === 0) {
                  return true;
                } else if (valueFilterCareers.includes(data.career)) {
                  return true;
                }
                return false;
              })
              .filter((data) => {
                // Filtrar por las carreras seleccionadas solo si hay carreras seleccionadas
                if (!valueFilterFavorites) {
                  return true;
                }
                return data.like;
              })
              .map((course) => (
                <div key={course.id + ""}>
                  <Box spacing={1} sx={{ width: "auto", margin: "5px" }}>
                    <CardCourse
                      course={course}
                      setCourseDescription={setCourseDescription}
                    />
                  </Box>
                </div>
              ))
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "30pt",
                }}
              >
                <CircularProgress />
              </Box>
            </>
          )}
        </Box>
        <CourseDescription courseDescription={courseDescription} />
      </Box>
    </Box>
  );
};

export default Home;
