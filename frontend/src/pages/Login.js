// /frontend/src/pages/Login.js

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    navigate("/dashboard");
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      alert(`Error: ${message}`);
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
