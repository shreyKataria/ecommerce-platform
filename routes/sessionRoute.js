const express = require("express");
const { getSessions } = require("../controllers/sessionController");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/sessions", auth, getSessions);

module.exports = router;
