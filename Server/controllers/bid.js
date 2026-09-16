const Bid = require("../models/bid");
const Pet = require("../models/pet");
const dodo = require("../services/dodo");
const mongoose = require("mongoose");

// Create a new bid
const createBid = async (req, res) => {
    try {
        const { petId, amount } = req.body;

        // Validate input
        if (!petId || !amount) {
            return res.status(400).json({
                success: false,
                message: "Pet ID and bid amount are required",
            });
        }

        // Validate petId ObjectId format
        if (!mongoose.Types.ObjectId.isValid(petId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Pet ID format",
            });
        }

        // Find pet
        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({
                success: false,
                message: "Pet not found",
            });
        }

        // Make sure bid is higher than current bid
        if (amount <= pet.currentBid) {
            return res.status(400).json({
                success: false,
                message: `Bid must be higher than current bid of $${pet.currentBid}`,
            });
        }

        // Create bid in MongoDB
        const bid = await Bid.create({
            petId: pet._id,
            amount,
            previousBid: pet.currentBid,
            currency: "USD",
            status: "pending",
        });

        // Convert dollars → cents
        const amountInCents = Math.round(amount * 100);

        // Create Dodo checkout session
        const session = await dodo.checkoutSessions.create({
            product_cart: [
                {
                    product_id: process.env.DODO_PAYMENTS_PRODUCT_ID,
                    quantity: 1,
                    amount: amountInCents,
                },
            ],

            return_url: `${process.env.FRONTEND_URL}/payment/success`,

            metadata: {
                bidId: bid._id.toString(),
                petId: pet._id.toString(),
            },
        });

        // Save Dodo session ID
        bid.dodoSessionId = session.session_id;
        await bid.save();

        return res.status(201).json({
            success: true,
            message: "Bid created and checkout session generated",
            data: {
                bidId: bid._id,
                petId: pet._id,
                amount: bid.amount,
                previousBid: bid.previousBid,
                status: bid.status,
                checkoutUrl: session.checkout_url,
            },
        });

    } catch (error) {
        console.error("Create bid error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create bid",
            error: error.message,
        });
    }
};



// Get a single bid
const getBid = async (req, res) => {
    try {
        const { id } = req.params;

        const bid = await Bid.findById(id).populate(
            "petId",
            "petName ownerName imageUrl currentBid rank"
        );

        if (!bid) {
            return res.status(404).json({
                success: false,
                message: "Bid not found",
            });
        }

        res.status(200).json({
            success: true,
            data: bid,
        });
    } catch (error) {
        console.error("Get bid error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch bid",
            error: error.message,
        });
    }
};


// Get all bids for a pet
const getBidsByPet = async (req, res) => {
    try {
        const { petId } = req.params;

        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({
                success: false,
                message: "Pet not found",
            });
        }

        const bids = await Bid.find({
            petId,
        }).sort({
            amount: -1,
            createdAt: 1,
        });

        res.status(200).json({
            success: true,
            count: bids.length,
            data: bids,
        });
    } catch (error) {
        console.error("Get pet bids error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch pet bids",
            error: error.message,
        });
    }
};


// Get all successful bids
const getSuccessfulBids = async (req, res) => {
    try {
        const bids = await Bid.find({
            status: "succeeded",
        })
            .populate(
                "petId",
                "petName ownerName imageUrl currentBid rank"
            )
            .sort({
                amount: -1,
                createdAt: 1,
            });

        res.status(200).json({
            success: true,
            count: bids.length,
            data: bids,
        });
    } catch (error) {
        console.error("Get successful bids error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch successful bids",
            error: error.message,
        });
    }
};

// Get bids by specific date
const getBidsByDate = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                success: false,
                message: "Date is required. Use YYYY-MM-DD format.",
            });
        }

        // Validate date format
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Use YYYY-MM-DD.",
            });
        }

        const startDate = new Date(`${date}T00:00:00.000Z`);
        const endDate = new Date(`${date}T23:59:59.999Z`);

        const bids = await Bid.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            },
        })
            .populate("petId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: `Bids for ${date} fetched successfully`,
            count: bids.length,
            data: bids,
        });
    } catch (error) {
        console.error("Get bids by date error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch bids by date",
            error: error.message,
        });
    }
};

// Get bids from yesterday until now
const getBidsFromYesterday = async (req, res) => {
    try {
        const now = new Date();

        const yesterday = new Date(
            now.getTime() - 24 * 60 * 60 * 1000
        );

        const bids = await Bid.find({
            status: "succeeded",
            createdAt: {
                $gte: yesterday,
                $lte: now,
            },
        })
            .populate("petId")
            .sort({ amount: -1 });

        res.status(200).json({
            success: true,
            message: "Bids from the last 24 hours fetched successfully",
            count: bids.length,
            data: bids,
        });
    } catch (error) {
        console.error("Get bids from yesterday error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch bids from the last 24 hours",
            error: error.message,
        });
    }
};


module.exports = {
    createBid,
    getBid,
    getBidsByPet,
    getSuccessfulBids,
    getBidsByDate,
    getBidsFromYesterday
};