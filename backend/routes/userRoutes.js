// /backend/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Public Routes (No token needed)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private/Protected Routes (Token needed)
router.route("/profile").get(protect, getProfile); // GET /api/users/profile

module.exports = router;
