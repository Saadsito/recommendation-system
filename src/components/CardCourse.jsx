import { Favorite, FavoriteBorder, Share } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const CardCourse = ({ course, setCourseDescription }) => {
  const [favorite, setFavorite] = useState(course.like);

  const likeClick = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
    handleLike(course.id);
  };

  const handleLike = async (courseId) => {
    try {
      const response = await fetch("http://localhost:5000/user_likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          course_id: courseId,
        }),
      });

      if (response.ok) {
        // Si la solicitud se realiza con éxito, actualiza el estado de favorite
        course.like = !course.like;
      }
    } catch (error) {
      // Manejar errores si es necesario
      console.error("Error al guardar el like:", error);
      setFavorite(!favorite);
    }
  };

  return (
    <Card sx={{ minWidth: 200 }}>
      <CardActionArea onClick={() => setCourseDescription(course)}>
        <CardHeader
          title={course.title}
          subheader="Universidad Catolica Andres Bello"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Desde: 04/10/2023 - Hasta: 21/11/2023
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Carrera: {course.career}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onMouseDown={(e) => e.stopPropagation()}
            onClick={likeClick}
            aria-label="add to favorites"
          >
            {favorite ? <Favorite color="secondary" /> : <FavoriteBorder />}
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default CardCourse;
