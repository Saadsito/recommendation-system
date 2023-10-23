import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import { Box, CircularProgress, Typography } from "@mui/material";
import CourseDescription from "../components/CourseDescription";
import CardCourse from "../components/CardCourse";
import { Masonry } from "@mui/lab";
import { useCoursesContext } from "../hooks/useCourses";

const Home = () => {
  const [searchCourse, setSearchCourse] = useState("");
  const [valueFilterUniversities, setValueFilterUniversities] = useState([]);
  const [valueFilterCareers, setValueFilterCareers] = useState([]);
  const [valueFilterLevel, setValueFilterLevel] = useState(0);
  const [valueFilterFavorites, setValueFilterFavorites] = useState(false);
  const [courseDescription, setCourseDescription] = useState(null);

  const { courses } = useCoursesContext();

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
                // Filtrar por las universidades seleccionadas solo si hay universidades seleccionadas
                if (valueFilterUniversities.length === 0) {
                  return true;
                } else if (valueFilterUniversities.includes(data.university)) {
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
              .filter((data) => {
                // Filtrar por nivel
                switch (valueFilterLevel) {
                  case 0:
                    return true;
                  case 1:
                    return data.level === "pregrado";
                  case 2:
                    return data.level === "posgrado";
                  case 3:
                    return data.level === "formacion continua";
                  default:
                    return true;
                }
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
