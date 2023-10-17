import { Clear, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Link,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import AutocompleteFilter from "./AutoCompleteFilter";

const CourseDescription = ({ courseDescription }) => {
  return (
    <Stack
      spacing={1}
      sx={{
        borderLeft: "1px solid #dcdcdc",
        minWidth: "300px",
        width: "300px",
        height: "calc(100vh - 64px)",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
        position: "relative",
      }}
    >
      {console.log(courseDescription)}
      {courseDescription ? (
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="body2">DESCRIPCION DE LA ELECTIVA</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="primary">
              Titulo de la electiva
            </Typography>
            <Typography variant="body2">{courseDescription.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="primary">
              Fecha
            </Typography>
            <Typography variant="body2">Desde: 04/10/2023</Typography>
            <Typography variant="body2">Hasta: 21/11/2023</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="primary">
              Universidad
            </Typography>
            <Typography variant="body2">
              Universidad Catolica Andres Bello
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="primary">
              Carrera
            </Typography>
            <Typography variant="body2">{courseDescription.career}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="primary">
              Nivel de estudios
            </Typography>
            <Typography variant="body2">Pregrado</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="primary">
              URL
            </Typography>
            <Link
              target="_blank"
              href="https://emovies.oui-iohe.org/nuestros-cursos/analisis-instrumental/"
              color="secondary"
            >
              <Typography variant="body2">
                https://emovies.oui-iohe.org/nuestros-cursos/analisis-instrumental/
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="primary">
              Requisitos del curso
            </Typography>
            <Typography variant="body2">
              {courseDescription.requirements}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="primary">
              Descripción del curso
            </Typography>
            <Typography variant="body2">
              {courseDescription.description}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12} textAlign={"center"} justifyContent={"center"}>
            <Typography variant="body2">SELECCIONA UNA ELECTIVA</Typography>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default CourseDescription;
