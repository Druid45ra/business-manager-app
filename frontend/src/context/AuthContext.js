// /frontend/src/context/AuthContext.js

import React, { createContext, useContext, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const initialUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);

  const login = async (userData) => {
    setLoading(true);
    try {
      const loggedInUser = await authService.login(userData);
      setUser(loggedInUser);
      setLoading(false);
      return loggedInUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const registeredUser = await authService.register(userData);
      setUser(registeredUser);
      setLoading(false);
      return registeredUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isManager: user?.role === "manager",
    userLocation: user?.location,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
