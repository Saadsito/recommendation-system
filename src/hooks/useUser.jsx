import { CircularProgress } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";

// Define un contexto de usuario
const UserContext = createContext();

// Hook para acceder al contexto de usuario
const useUser = () => {
  return useContext(UserContext);
};

// Componente proveedor de usuario
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    console.log(token);

    if (token) {
      // Si hay un token en localStorage, verifica la autenticación
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_user", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      setUser(null);
    }

    setLoading(false);
  };

  return (
    <UserContext.Provider value={user}>
      {loading ? <CircularProgress /> : children}
    </UserContext.Provider>
  );
};

export { useUser, UserProvider };
