// /backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
} = require("../controllers/productController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Route for creating a new product
// Access is restricted to users with 'admin' or 'manager' roles
router
  .route("/")
  .post(protect, authorize(["admin", "manager"]), createProduct)
  .get(protect, getProducts); // Any logged-in user can view products from their location

module.exports = router;
