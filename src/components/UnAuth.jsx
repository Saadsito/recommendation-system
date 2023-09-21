import { Navigate } from "react-router-dom";

const UnAuth = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default UnAuth;
