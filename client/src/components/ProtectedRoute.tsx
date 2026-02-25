import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const storedUser = localStorage.getItem("localUser");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let localUser;

  try {
    localUser = JSON.parse(storedUser);
  } catch {
    return <Navigate to="/login" replace />;
  }

  const userRole = localUser?.data?.role?.toLowerCase();

  if (!userRole || !allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
