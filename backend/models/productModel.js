// /backend/models/productModel.js

const mongoose = require("mongoose");

// Define the Product (Inventory Item) Schema
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    sku: {
      // Stock Keeping Unit
      type: String,
      unique: true,
      required: [true, "Please add a SKU"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add the product quantity"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please add the product price"],
      default: 0,
    },
    // CRUCIAL: Link the product/inventory item to a specific Location
    location: {
      type: String,
      required: true,
    },
    // User who created/updated the product entry
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
