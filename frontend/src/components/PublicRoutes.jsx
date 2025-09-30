import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("tokens");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
