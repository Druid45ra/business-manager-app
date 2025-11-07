// /backend/controllers/productController.js

const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc    Add a new product entry
// @route   POST /api/products
// @access  Private (Requires 'admin' or 'manager' role)
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, quantity, price } = req.body;

  if (!name || !sku || !quantity || !price) {
    res.status(400);
    throw new Error(
      "Please include all required fields: name, sku, quantity, and price."
    );
  }

  // --- SECURITY IMPLEMENTATION: LOCATION RESTRICTION ---
  const productLocation = req.user.location;

  // Check if a product with the same SKU already exists in THIS specific location
  const productExists = await Product.findOne({
    sku,
    location: productLocation,
  });

  if (productExists) {
    res.status(400);
    throw new Error(
      `Product with SKU ${sku} already exists at location ${productLocation}`
    );
  }

  // Create the product
  const product = await Product.create({
    name,
    sku,
    quantity,
    price,
    location: productLocation, // Restricted to user's location
    user: req.user._id, // User who created the product
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Invalid product data received");
  }
});

// @desc    Get all products for the user's location
// @route   GET /api/products
// @access  Private (Requires any role)
const getProducts = asyncHandler(async (req, res) => {
  // --- LOCATION RESTRICTION FOR VIEWING ---
  const products = await Product.find({ location: req.user.location });

  res.status(200).json(products);
});

module.exports = {
  createProduct,
  getProducts,
};
