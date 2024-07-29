const express = require("express");
const { processPayment } = require("../controllers/paymentsController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/payment", auth, processPayment);

module.exports = router;
