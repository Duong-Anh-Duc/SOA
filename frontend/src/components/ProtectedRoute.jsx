import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiresAuth = true }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return null; // Hiển thị loading hoặc không hiển thị gì trong lúc kiểm tra
  }

  if (requiresAuth) {
    // Route yêu cầu đăng nhập (như trang Home)
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  } else {
    // Route không yêu cầu đăng nhập (như trang Login)
    return !isAuthenticated ? children : <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
