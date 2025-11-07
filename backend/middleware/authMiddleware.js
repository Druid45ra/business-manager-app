// /backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// --- 1. AUTHENTICATION Middleware (Protect) ---
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select(
        "_id role location isActive"
      );

      if (!user || !user.isActive) {
        res.status(401); // Unauthorized
        throw new Error("User not found or account disabled");
      }

      // Attach user information to the request object
      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed or expired");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// --- 2. AUTHORIZATION Middleware (Authorize by Role) ---
const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      res.status(401);
      throw new Error("Authorization failed: No user role provided.");
    }

    if (!roles.includes(req.user.role)) {
      res.status(403); // 403: Forbidden
      throw new Error(
        `User role (${req.user.role}) is not authorized to access this resource.`
      );
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};
