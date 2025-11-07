const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

// Load environment variables from .env file
dotenv.config();

// Initialize the express application
const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---

/**
 * @description Connects the application to the MongoDB database using Mongoose.
 * @returns {void}
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// --- ROUTES ---
// Mount user routes at the '/api/users' path
app.use("/api/users", userRoutes);

// Mount product routes at the '/api/products' path
app.use("/api/products", productRoutes);

// Fallback route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// --- ERROR HANDLER (MUST be last middleware) ---
app.use(errorHandler);

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  )
);
