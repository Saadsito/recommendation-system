import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "../components/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import uniqueExpertiseAreas from "../utils/expertiseAreas";
import AutocompleteTextField from "../components/AutoCompleteTextField";
import uniqueTechnologies from "../utils/technologies";
import Linkedin from "../components/Linkedin";

const defaultTheme = createTheme();

const Signuplinkedin = () => {
  const [valueExpertiseAreas, setValueExpertiseAreas] = useState([]);
  const [valueTechnologies, setValueTechnologies] = useState([]);

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/graduate_users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: valueTechnologies,
          specializations: valueExpertiseAreas,
        }),
      });

      if (response.status === 200) {
        // Registro exitoso, puedes redirigir al usuario o mostrar un mensaje de éxito.
        console.log("Usuario registrado exitosamente");
      } else {
        console.error("Error al registrar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ marginBottom: "40pt" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <svg
              xmlns="http://www.w3.org/2010/svg"
              viewBox="0 0 139 128"
              style={{ width: "20vw", height: "10vh" }}
            >
              <path
                d="M69.5 19L88.9856 41.5V86.5L69.5 109L50.0144 86.5V41.5L69.5 19Z"
                stroke="#4B7ABC"
                stroke-width=".5"
                fill="#4B7ABC"
              />
              <path
                d="M114.5 19L133.986 41.5V86.5L114.5 109L95.0144 86.5V41.5L114.5 19Z"
                stroke="#006225"
                stroke-width=".5"
                fill="#006225"
              />
              <path
                d="M24.5 19L43.9856 41.5V86.5L24.5 109L5.01443 86.5V41.5L24.5 19Z"
                stroke="#FFF120"
                stroke-width=".5"
                fill="#FFF120"
              />
            </svg>
          </Box>
          <Typography component="h1" variant="h5">
            ¡Regístrate!
          </Typography>
          <Box sx={{ width: "100%" }}>
            <div>
              <div>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Linkedin
                        valueExpertiseAreas={valueExpertiseAreas}
                        setValueExpertiseAreas={setValueExpertiseAreas}
                        valueTechnologies={valueTechnologies}
                        setValueTechnologies={setValueTechnologies}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AutocompleteTextField
                        value={valueExpertiseAreas}
                        setValue={setValueExpertiseAreas}
                        array={uniqueExpertiseAreas}
                        label={"Áreas de especialización"}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AutocompleteTextField
                        value={valueTechnologies}
                        setValue={setValueTechnologies}
                        array={uniqueTechnologies}
                        label={"Tecnologías preferidas"}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <Grid container spacing={2} sx={{ mt: 0, mb: 2 }}>
                <Grid item>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    // loading={isSubmitting}
                    onClick={handleRegister}
                  >
                    Registrar
                  </LoadingButton>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signuplinkedin;
