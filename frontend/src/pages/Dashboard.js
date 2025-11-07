// /frontend/src/pages/Dashboard.js

import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user, isAdmin, isManager, userLocation } = useAuth();

  if (!user) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <h2>Dashboard for {userLocation}</h2>

      <p>Your Role: **{user.role.toUpperCase()}**</p>

      <h3>Quick Actions</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/inventory">View Inventory</Link>
        </li>
        {/* Actions restricted by role */}
        {(isAdmin || isManager) && (
          <li>
            **Manager/Admin Action:**{" "}
            <Link to="/inventory/add">Add New Product</Link>
          </li>
        )}
        {isAdmin && (
          <li>
            **Admin Action:**{" "}
            <Link to="/admin/manage-users">Manage All Users</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Dashboard;
