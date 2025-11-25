const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const {
  authMiddleware,
  isAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public product routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin product routes
router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
