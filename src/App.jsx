import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignupLinkedin from "./pages/SignupLinkedin";
import UnAuth from "./components/UnAuth";
import Auth from "./components/Auth";
import { UserProvider } from "./hooks/useUser";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          element={
            <UnAuth>
              <Outlet />
            </UnAuth>
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupLinkedin" element={<SignupLinkedin />} />
        </Route>
        <Route
          element={
            <Auth>
              <Outlet />
            </Auth>
          }
        >
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
