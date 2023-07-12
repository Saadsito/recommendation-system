import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const UnAuth = ({ children }) => {
  const user = useUser();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default UnAuth;
