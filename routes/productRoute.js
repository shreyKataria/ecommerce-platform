const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/products", auth, createProduct);
router.get("/products", getProducts);
router.put("/products/:id", auth, updateProduct);
router.delete("/products/:id", auth, deleteProduct);

module.exports = router;
