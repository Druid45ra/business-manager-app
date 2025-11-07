// /frontend/src/services/productService.js

import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/products`;

/**
 * @description Creates an authorized Axios instance.
 * @param {string} token - The user's JWT.
 * @returns {object} Axios instance with Authorization header.
 */
const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

/**
 * @description Fetches products for the user's assigned location.
 * @param {string} token - The user's JWT.
 * @returns {Promise<Array>} List of products.
 */
const getProducts = async (token) => {
  // The Backend automatically filters by the location embedded in the token payload.
  const response = await axios.get(API_URL, getConfig(token));
  return response.data;
};

/**
 * @description Creates a new product, restricted to the user's location by the Backend.
 * @param {object} productData - Product details (name, sku, quantity, price).
 * @param {string} token - The user's JWT.
 * @returns {Promise<object>} The newly created product.
 */
const createProduct = async (productData, token) => {
  // The Backend checks the user's role ('admin' or 'manager') and sets the location.
  const response = await axios.post(API_URL, productData, getConfig(token));
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;
