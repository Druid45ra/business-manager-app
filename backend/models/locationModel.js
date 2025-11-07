// /backend/models/locationModel.js

const mongoose = require("mongoose");

// Define the Location Schema
const locationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a location name"],
      unique: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Please add the city name"],
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
