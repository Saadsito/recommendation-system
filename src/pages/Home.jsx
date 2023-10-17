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
  const [valueFilterBeginDate, setValueFilterBeginDate] = useState(null);
  const [valueFilterEndDate, setValueFilterEndDate] = useState(null);

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
          valueFilterBeginDate={valueFilterBeginDate}
          setValueFilterBeginDate={setValueFilterBeginDate}
          valueFilterEndDate={valueFilterEndDate}
          setValueFilterEndDate={setValueFilterEndDate}
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
            courses.map((course) => (
              <Masonry
                columns={1}
                spacing={1}
                sx={{ width: "auto", margin: "5px" }}
              >
                <div key={course.id + ""}>
                  <CardCourse
                    course={course}
                    setCourseDescription={setCourseDescription}
                  />
                </div>
              </Masonry>
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
