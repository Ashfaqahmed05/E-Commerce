import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('users'));

  if (!user) {
    // If user is not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user does not have the required role, redirect to home
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
