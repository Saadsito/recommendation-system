import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "../components/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import uniqueExpertiseAreas from "../utils/expertiseAreas";
import AutocompleteTextField from "../components/AutoCompleteTextField";
import uniqueTechnologies from "../utils/technologies";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Linkedin from "../components/Linkedin";
import { useNavigate } from "react-router-dom";

const signUpData = {
  name: "",
  cedula: "",
  email: "",
  password: "",
  level: 1,
};

const defaultTheme = createTheme();

const Signup = () => {
  const [userSignUp, setUserSignUp] = useState(signUpData);
  const [activeStep, setActiveStep] = useState(0);
  const [valueExpertiseAreas, setValueExpertiseAreas] = useState([]);
  const [valueTechnologies, setValueTechnologies] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleChangeSignUp = (name, value) => {
    setUserSignUp({ ...userSignUp, [name]: value });
  };

  const steps = [
    "Información personal",
    "Detalles de Especialización y Preferencias",
  ];

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userSignUp.name,
            id_card: userSignUp.cedula,
            email: userSignUp.email,
            password: userSignUp.password,
            level_id: userSignUp.level,
            skills: valueTechnologies,
            specializations: valueExpertiseAreas,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error en la solicitud");
        }

        // Iniciar sesión automáticamente después del registro
        const loginResponse = await fetch("http://localhost:5000/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userSignUp.email, // Utiliza el correo del usuario registrado
            password: userSignUp.password, // Utiliza la contraseña del usuario registrado
          }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          localStorage.setItem("access_token", loginData.access_token);

          enqueueSnackbar(
            "Usuario registrado y ha iniciado sesión correctamente",
            {
              variant: "success",
            }
          );

          // Redirige al usuario a la página "/home"
          navigate("/home");
        } else {
          enqueueSnackbar(loginData.message || "Error en el inicio de sesión", {
            variant: "error",
          });
        }
      } catch (error) {
        console.error(error.message);
        enqueueSnackbar(`Error al registrar al usuario: ${error.message}`, {
          variant: "error",
        });
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const verifyStep = (activeStep) => {
    switch (activeStep) {
      case 0:
        return (
          userSignUp.name === "" ||
          userSignUp.cedula === "" ||
          userSignUp.email === "" ||
          userSignUp.password === ""
        );
      case 1:
        return false;
      default:
        return true;
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
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              <div>
                {activeStep === 0 ? (
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="Nombre"
                          onChange={(e) =>
                            handleChangeSignUp("name", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleChangeSignUp("cedula", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleChangeSignUp("email", e.target.value)
                          }
                          value={userSignUp.email}
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
                          type={showPassword ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="cambiar visibilidad de la contraseña"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            handleChangeSignUp("password", e.target.value)
                          }
                          value={userSignUp.password}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
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
                            value={userSignUp.level}
                            label="Nivel de estudios"
                            onChange={(e) =>
                              handleChangeSignUp("level", e.target.value)
                            }
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
                    </Grid>
                  </Box>
                )}
              </div>
              <Grid container spacing={2} sx={{ mt: 0, mb: 2, ml: 0 }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    // loading={isSubmitting}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Anterior
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    // loading={isSubmitting}
                    onClick={handleNext}
                    disabled={verifyStep(activeStep)}
                  >
                    {activeStep !== steps.length - 1
                      ? "Siguiente"
                      : "Registrarse"}
                  </LoadingButton>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">
                    ¿Ya tienes cuenta? ¡Inicia sesión aquí!
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
