const express = require("express");

const {
    getImageKitAuth,
} = require("../controllers/imagekit");

const router = express.Router();

router.get("/auth", getImageKitAuth);

module.exports = router;