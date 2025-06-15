// Load environment variables from .env
require("dotenv").config();

// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("./authModel"); // your auth schema

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB Atlas (no need for deprecated options)
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB is connected!");
    
    // Start server after DB is connected
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Root route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Auth API with MongoDB Atlas!");
});
