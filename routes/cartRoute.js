const express = require("express");
const { addToCart, getCart } = require("../controllers/cartController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/cart", auth, addToCart);
router.get("/cart", auth, getCart);

module.exports = router;
