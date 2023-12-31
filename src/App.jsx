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
import Profile from "./pages/Profile";
import { CoursesProvider } from "./hooks/useCourses";

function App() {
  return (
    <UserProvider>
      <CoursesProvider>
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
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </CoursesProvider>
    </UserProvider>
  );
}

export default App;
