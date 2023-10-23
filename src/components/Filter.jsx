import { Clear, Favorite, FavoriteBorder, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import AutocompleteFilter from "./AutoCompleteFilter";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { esES } from "@mui/x-date-pickers/locales";
import "dayjs/locale/es";
import dayjs from "dayjs";

const Filter = ({
  searchCourse,
  setSearchCourse,
  valueFilterUniversities,
  setValueFilterUniversities,
  valueFilterCareers,
  setValueFilterCareers,
  valueFilterLevel,
  setValueFilterLevel,
  valueFilterFavorites,
  setValueFilterFavorites,
}) => {
  const [universities, setUniversities] = useState([]);
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    // Realiza la solicitud HTTP al servidor Flask
    fetch("http://localhost:5000/universities")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de universidades.");
        }
        return response.json();
      })
      .then((data) => {
        // Actualiza el estado con los datos recibidos
        setUniversities(data.universities);
      })
      .catch((error) => {
        console.error("Error al obtener las universidades:", error);
      });
  }, []);

  useEffect(() => {
    // Realiza la solicitud HTTP al servidor Flask
    fetch("http://localhost:5000/careers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de carreras.");
        }
        return response.json();
      })
      .then((data) => {
        // Actualiza el estado con los datos recibidos
        setCareers(data.careers);
      })
      .catch((error) => {
        console.error("Error al obtener las carreras:", error);
      });
  }, []);

  const handleDeleteFilters = () => {
    setSearchCourse("");
    setValueFilterCareers([]);
    setValueFilterUniversities([]);
    setValueFilterLevel(0);
  };

  const handleShowFavorites = () => {
    setValueFilterFavorites(!valueFilterFavorites);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        borderRight: "1px solid #dcdcdc",
        minWidth: "360px",
        width: "360px",
        height: "calc(100vh - 64px)",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <Grid container spacing={3} sx={{ justifyContent: "center", padding: 2 }}>
        <Grid item xs={12} textAlign={"center"}>
          <Typography variant="body2">FILTROS</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar una electiva"
              value={searchCourse}
              onChange={(e) => setSearchCourse(e.target.value)}
            />
            {searchCourse.length !== 0 && (
              <>
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={() => setSearchCourse("")}
                >
                  <Clear />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              </>
            )}
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
              disableRipple
            >
              <Search />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant={valueFilterFavorites ? "contained" : "outlined"}
            disableElevation
            onClick={handleShowFavorites}
            color="secondary"
            endIcon={!valueFilterFavorites ? <FavoriteBorder /> : <Favorite />}
          >
            Mostrar favoritos
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <AutocompleteFilter
            value={valueFilterUniversities}
            setValue={setValueFilterUniversities}
            array={universities}
            label={"Universidades"}
          />
        </Grid>
        <Grid item xs={12}>
          <AutocompleteFilter
            value={valueFilterCareers}
            setValue={setValueFilterCareers}
            array={careers}
            label={"Carreras universitarias"}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Nivel de estudios
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valueFilterLevel}
              label="Nivel de estudios"
              onChange={(e) => setValueFilterLevel(e.target.value)}
            >
              <MenuItem value={0}>Cualquiera</MenuItem>
              <MenuItem value={1}>Pregrado</MenuItem>
              <MenuItem value={2}>Posgrado</MenuItem>
              <MenuItem value={3}>Formación Continua</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} mt={8}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            disabled={
              !searchCourse &&
              !valueFilterUniversities.length &&
              !valueFilterCareers.length &&
              !valueFilterLevel
            }
            onClick={handleDeleteFilters}
          >
            Borrar filtros
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Filter;
