import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  AccountCircleOutlined,
  ArrowBack,
  ArrowBackIos,
  ArrowBackIosNew,
  ExitToApp,
} from "@mui/icons-material";

export default function Header({ backButton }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Realiza una solicitud al servidor para hacer logout
      const response = await fetch("http://localhost:5000/logout", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      });

      if (response.ok) {
        localStorage.removeItem("access_token");
        navigate("/login");
        enqueueSnackbar("Has cerrado sesión correctamente", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Error al hacer logout", { variant: "error" });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      enqueueSnackbar("Error al conectarse al servidor", { variant: "error" });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            {backButton && (
              <IconButton onClick={() => navigate("/home")}>
                <ArrowBackIosNew sx={{ color: "#fff" }} />
              </IconButton>
            )}
          </Box>
          <IconButton
            color="inherit"
            sx={{ marginRight: 1 }}
            onClick={() => navigate("/profile")}
          >
            <AccountCircleOutlined />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{ marginLeft: 1 }}
          >
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
