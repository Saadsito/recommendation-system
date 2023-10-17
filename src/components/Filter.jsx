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
  valueFilterBeginDate,
  setValueFilterBeginDate,
  valueFilterEndDate,
  setValueFilterEndDate,
}) => {
  const [universities, setUniversities] = useState([]);
  const [careers, setCareers] = useState([]);
  const [variantFavoriteButton, setVariantFavoriteButton] =
    useState("outlined");

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
    setValueFilterBeginDate(null);
    setValueFilterEndDate(null);
  };

  const handleShowFavorites = () => {
    if (variantFavoriteButton === "outlined")
      setVariantFavoriteButton("contained");
    else setVariantFavoriteButton("outlined");
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
            variant={variantFavoriteButton}
            disableElevation
            onClick={handleShowFavorites}
            color="secondary"
            endIcon={
              variantFavoriteButton === "outlined" ? (
                <FavoriteBorder />
              ) : (
                <Favorite />
              )
            }
          >
            Mostrar favoritos
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DemoContainer components={["DatePicker"]}>
              <Grid item xs={15}>
                <DatePicker
                  label="Desde"
                  value={valueFilterBeginDate} // Asegúrate de que valueFilterBeginDate sea un objeto de fecha válido
                  minDate={dayjs()} // Establece la fecha mínima como el día actual
                  onChange={(newValue) => {
                    // Lógica para asegurar que la fecha seleccionada en "Desde" no sea menor a la fecha seleccionada en "Hasta"
                    if (
                      valueFilterEndDate &&
                      newValue.isBefore(valueFilterEndDate)
                    ) {
                      setValueFilterBeginDate(newValue.toDate());
                    } else if (!valueFilterEndDate) {
                      setValueFilterBeginDate(newValue.toDate());
                    }
                  }}
                />
              </Grid>
              <Grid item xs={15}>
                <DatePicker
                  label="Hasta"
                  value={valueFilterEndDate} // Asegúrate de que valueFilterEndDate sea un objeto de fecha válido
                  minDate={
                    valueFilterBeginDate ? dayjs(valueFilterBeginDate) : dayjs()
                  } // Establece la fecha mínima como el valor seleccionado en el DatePicker "Desde" o el día actual si "Desde" no tiene fecha seleccionada
                  onChange={(newValue) => {
                    // Lógica para asegurar que la fecha seleccionada en "Hasta" no sea menor a la fecha seleccionada en "Desde"
                    if (
                      valueFilterBeginDate &&
                      newValue.isAfter(valueFilterBeginDate)
                    ) {
                      setValueFilterEndDate(newValue.toDate());
                    } else if (!valueFilterBeginDate) {
                      setValueFilterEndDate(newValue.toDate());
                    }
                  }}
                />
              </Grid>
            </DemoContainer>
          </LocalizationProvider>
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
              <MenuItem value={2}>Postgrado</MenuItem>
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
              !valueFilterLevel &&
              !valueFilterBeginDate &&
              !valueFilterEndDate
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
