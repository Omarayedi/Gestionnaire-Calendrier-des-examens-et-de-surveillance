import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user details are stored

  if (!token) {
    return <Navigate to="/" />;
  }

  // Check if user has the required role
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />; // Redirect if role doesn't match
  }

  return children;
};

export default PrivateRoute;
