// /frontend/src/pages/AddProduct.js (NEW FILE)

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import productService from "../services/productService";

function AddProduct() {
  const { user, isAuthenticated, isAdmin, isManager, userLocation } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: 0,
    price: 0,
  });
  const [loading, setLoading] = useState(false);

  // --- ROLE AUTHORIZATION (Frontend Check) ---
  if (!isAuthenticated || (!isAdmin && !isManager)) {
    // If not authorized by role, redirect to dashboard
    alert("Access Denied: Only Admins and Managers can add products.");
    return <Navigate to="/dashboard" replace />;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = user.token;
      // Backend va seta automat locația la userLocation și va verifica rolul
      await productService.createProduct(formData, token);

      alert(`Product created successfully at ${userLocation}!`);
      navigate("/inventory"); // Go back to inventory view
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Product creation failed.";
      alert(`Error creating product: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add New Product to {userLocation}</h1>
      <p>
        Note: Product will automatically be assigned to your location: **
        {userLocation}**.
      </p>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={onChange}
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="price">Price (RON)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={onChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
