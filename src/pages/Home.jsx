import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useUser();
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
    <div>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
      {console.log(user)}
    </div>
  );
};

export default Home;
