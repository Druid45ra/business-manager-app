// /frontend/src/components/PrivateRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * @description A wrapper component that checks for authentication.
 * If the user is authenticated, it renders the children (the protected page).
 * Otherwise, it redirects them to the login page.
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // În acest caz, nu avem un spinner, dar un mesaj ajută
  if (loading) {
    return <div>Verificare sesiune utilizator...</div>;
  }

  // Dacă utilizatorul este autentificat, afișează pagina solicitată
  if (isAuthenticated) {
    return children;
  }

  // Dacă nu este autentificat, redirecționează către pagina de login
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
