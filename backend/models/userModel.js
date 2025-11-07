// /backend/models/userModel.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the User Schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    // User role for access control (security levels)
    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "employee"],
      default: "employee",
    },
    // The specific location/branch the user belongs to
    location: {
      type: String,
      required: [true, "Please specify the user location/branch"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// --- Middleware (Pre-save hook) ---
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Instance Methods ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
