const express = require("express");

const {
    createBid,
    getBid,
    getBidsByPet,
    getSuccessfulBids,
    getBidsByDate,
    getBidsFromYesterday
} = require("../controllers/bid");

const router = express.Router();


router.post("/create", createBid);
router.get("/successful", getSuccessfulBids);
router.get("/pet/:petId", getBidsByPet);
router.get("/date", getBidsByDate);
router.get("/yesterday", getBidsFromYesterday);
router.get("/:id", getBid);


module.exports = router;