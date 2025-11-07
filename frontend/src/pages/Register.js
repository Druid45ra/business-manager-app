// /frontend/src/pages/Register.js

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const locations = ["Bucuresti", "Cluj", "Timisoara", "Iasi"];
const roles = ["admin", "manager", "employee"];

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    location: "Bucuresti",
  });
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("User registered successfully! Redirecting to Dashboard.");
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      alert(`Error: ${message}`);
    }
  };

  return (
    <div>
      <h2>Register New User (Admin/Test Use)</h2>
      <form onSubmit={onSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>
        {/* Role Selection */}
        <div>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={onChange}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        {/* Location Selection */}
        <div>
          <label htmlFor="location">Location</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={onChange}
          >
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
