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
import React, { useState } from "react";

const CardCourse = ({ course, setCourseDescription }) => {
  const [favorite, setFavorite] = useState(false);

  const likeClick = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
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
            Carrera: Ingenieria en informatica
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
