import React from 'react';
import { Navigate } from 'react-router-dom';

// En una app real, estos estados vendrían de un contexto de autenticación
const isAuth = false;
const userRole = 'cliente'; // 'cliente' o 'admin'

const AdminRoute = ({ children }) => {
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  
  return userRole === 'admin' ? children : <Navigate to="/" />;
};

export default AdminRoute;
