import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Auth = ({ children }) => {
  const user = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Auth;
