import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('userToken');
  const userRole = localStorage.getItem('userRole'); // Assuming the role is stored in local storage
  const location = useLocation();

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && userRole !== 'administrator') {
    // If adminOnly is true and user is not an admin, redirect to homepage or show an alert
    alert('Access denied');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
