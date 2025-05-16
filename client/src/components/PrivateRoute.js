import React from 'react';
import { Navigate } from 'react-router-dom';

// En una app real, este estado vendría de un contexto de autenticación
const isAuth = false;

const PrivateRoute = ({ children }) => {
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
