import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import AutocompleteTextField from "../components/AutoCompleteTextField";
import uniqueExpertiseAreas from "../utils/expertiseAreas";
import uniqueTechnologies from "../utils/technologies";

const Profile = () => {
  const [valueExpertiseAreas, setValueExpertiseAreas] = useState([]);
  const [valueTechnologies, setValueTechnologies] = useState([]);

  return (
    <Box>
      <Header backButton />
      <Container component="main" maxWidth="xs" sx={{ marginBottom: "40pt" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AutocompleteTextField
                value={valueExpertiseAreas}
                setValue={setValueExpertiseAreas}
                array={uniqueExpertiseAreas}
                label={"Áreas de especialización"}
              />
            </Grid>
            <Grid item xs={12} mt={"-12px"}>
              <Typography
                variant="body2"
                color={"GrayText"}
                textAlign={"center"}
              >
                Selecciona también las áreas de especialización que te
                interesan.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Nivel de estudios
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={userSignUp.level}
                  label="Nivel de estudios"
                  // onChange={(e) => handleChangeSignUp("level", e.target.value)}
                >
                  <MenuItem value={1}>Pregrado</MenuItem>
                  <MenuItem value={2}>Postgrado</MenuItem>
                  <MenuItem value={3}>Formación Continua</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <AutocompleteTextField
                value={valueTechnologies}
                setValue={setValueTechnologies}
                array={uniqueTechnologies}
                label={"Habilidades"}
              />
            </Grid>
            <Grid item xs={12} mt={"-12px"}>
              <Typography
                variant="body2"
                color={"GrayText"}
                textAlign={"center"}
              >
                Selecciona también las habilidades que te interesan.
              </Typography>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 0, mb: 2, ml: 0 }}>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="outlined" color="error">
                  Eliminar cambios
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button type="submit" fullWidth variant="contained">
                  Guardar cambios
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
