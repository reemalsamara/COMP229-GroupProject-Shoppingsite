const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Register new user (useful for seeding)
router.post("/register", register);

// Login
router.post("/login", login);

// Logout (protected)
router.post("/logout", authMiddleware, logout);

module.exports = router;
