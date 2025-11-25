const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const {
  authMiddleware,
  isAdmin,
  isCustomer
} = require("../middleware/authMiddleware");

const router = express.Router();

// Admin actions for users
router.get("/", authMiddleware, isAdmin, getUsers);
router.post("/", authMiddleware, isAdmin, createUser);
router.put("/:id", authMiddleware, isCustomer, updateUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;
