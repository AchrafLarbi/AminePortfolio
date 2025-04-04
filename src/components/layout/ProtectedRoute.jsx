/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { getAuthenticatedUser } from "../../utils/auth";

const ProtectedRoute = ({ children }) => {
  const user = getAuthenticatedUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
