import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "../components/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import AcademicRecord from "../components/AcademicRecord";

const signUpData = {
  name: "",
  cedula: "",
  email: "",
  academicRecord: {},
};

const defaultTheme = createTheme();

const Signup = () => {
  const [userSignUp, setUserSignUp] = useState(signUpData);

  const handleChangeSignUp = (name, value) => {
    setUserSignUp({ ...userSignUp, [name]: value });
  };

  useEffect(() => {
    console.log(userSignUp);
  }, [userSignUp]);

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
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <AcademicRecord
                  setUserInfo={setUserSignUp}
                  userInfo={userSignUp}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  onChange={(e) => handleChangeSignUp("name", e.target.value)}
                  value={userSignUp.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cedula"
                  label="Cédula de identidad"
                  name="cedula"
                  onChange={(e) => handleChangeSignUp("cedula", e.target.value)}
                  value={userSignUp.cedula}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Contraseña"
                  name="password"
                  autoComplete="password"
                  type="password"
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // loading={isSubmitting}
            >
              Registrarse
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">¿Ya tienes cuenta? ¡Inicia sesión aquí!</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
