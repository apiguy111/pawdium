const express = require("express");
const { handleWebhook } = require("../controllers/payment");

const router = express.Router();

router.post("/webhook", handleWebhook);

module.exports = router;