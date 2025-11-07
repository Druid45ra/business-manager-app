// /frontend/src/components/Header.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div className="logo">
        <Link to="/">**Business Manager**</Link>
      </div>
      <nav>
        <ul style={{ listStyle: "none", display: "flex", gap: "15px" }}>
          {isAuthenticated ? (
            <>
              <li style={{ fontWeight: "bold" }}>
                {user.role.toUpperCase()} | {user.location}
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/inventory">Inventory</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register (Test)</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
