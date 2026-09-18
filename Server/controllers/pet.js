const Pet = require("../models/pet");
const Bid = require("../models/bid");
const { uploadImage } = require("../services/firebase");


// Upload image to Firebase Storage via Server
const uploadPetImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided",
            });
        }

        const imageUrl = await uploadImage(req.file);

        return res.status(200).json({
            success: true,
            imageUrl,
        });
    } catch (error) {
        console.error("Server upload image error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to upload image to Firebase",
            error: error.message,
        });
    }
};

// Create a new pet
const createPet = async (req, res) => {
    try {
        const {
            petName,
            ownerName,
            petType,
            breed,
            country,
            city,
            about,
            imageUrl,
            currentBid,
        } = req.body;

        // Check if image URL is provided
        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Pet image URL is required",
            });
        }

        // Create pet in MongoDB
        const pet = await Pet.create({
            petName,
            ownerName,
            petType,
            breed,
            country,
            city,
            about,
            imageUrl,
            currentBid: currentBid || 0,
        });

        res.status(201).json({
            success: true,
            message: "Pet created successfully",
            data: pet,
        });
    } catch (error) {
        console.error("Create pet error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create pet",
            error: error.message,
        });
    }
};
// Get a single pet by ID
const getPet = async (req, res) => {
    try {
        const { id } = req.params;

        const pet = await Pet.findById(id);

        if (!pet) {
            return res.status(404).json({
                success: false,
                message: "Pet not found",
            });
        }

        res.status(200).json({
            success: true,
            data: pet,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch pet",
            error: error.message,
        });
    }
};


// Get all pets (only those with a successful payment, i.e. currentBid > 0)
const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find({ currentBid: { $gt: 0 } }).sort({ currentBid: -1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: pets.length,
            data: pets,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch pets",
            error: error.message,
        });
    }
};


// Get pets by country (only paid pets)
const getPetsByCountry = async (req, res) => {
    try {
        const { country } = req.params;

        const pets = await Pet.find({
            currentBid: { $gt: 0 },
            country: {
                $regex: `^${country}$`,
                $options: "i",
            },
        }).sort({ rank: 1 });

        res.status(200).json({
            success: true,
            count: pets.length,
            data: pets,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch pets by country",
            error: error.message,
        });
    }
};


// Get pets by city (only paid pets)
const getPetsByCity = async (req, res) => {
    try {
        const { city } = req.params;

        const pets = await Pet.find({
            currentBid: { $gt: 0 },
            city: {
                $regex: `^${city}$`,
                $options: "i",
            },
        }).sort({ rank: 1 });

        res.status(200).json({
            success: true,
            count: pets.length,
            data: pets,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch pets by city",
            error: error.message,
        });
    }
};


// Search pets by pet name (only paid pets)
const searchPetsByName = async (req, res) => {
    try {
        const { petName } = req.params;

        const pets = await Pet.find({
            currentBid: { $gt: 0 },
            petName: {
                $regex: petName,
                $options: "i",
            },
        }).sort({ rank: 1 });

        res.status(200).json({
            success: true,
            count: pets.length,
            data: pets,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to search pets",
            error: error.message,
        });
    }
};


// Filter pets by type (only paid pets)
const getPetsByType = async (req, res) => {
    try {
        const { petType } = req.params;

        const pets = await Pet.find({
            currentBid: { $gt: 0 },
            petType: {
                $regex: `^${petType}$`,
                $options: "i",
            },
        }).sort({ rank: 1 });

        res.status(200).json({
            success: true,
            count: pets.length,
            data: pets,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to filter pets by type",
            error: error.message,
        });
    }
};


// Increment pet views
const incrementPetViews = async (req, res) => {
    try {
        const { id } = req.params;

        const pet = await Pet.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!pet) {
            return res.status(404).json({
                success: false,
                message: "Pet not found",
            });
        }

        return res.status(200).json({
            success: true,
            views: pet.views,
            data: pet,
        });
    } catch (error) {
        console.error("Increment pet views error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to increment pet views",
            error: error.message,
        });
    }
};

// Get platform statistics (only paid pets count)
const getPetStats = async (req, res) => {
    try {
        const totalPets = await Pet.countDocuments({ currentBid: { $gt: 0 } });

        // Calculate total bids amount from successful bids and current bids
        const bidAgg = await Bid.aggregate([
            { $match: { status: "succeeded" } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const bidsTotal = bidAgg[0]?.total || 0;

        const petAgg = await Pet.aggregate([
            { $group: { _id: null, total: { $sum: "$currentBid" } } },
        ]);
        const petCurrentBidTotal = petAgg[0]?.total || 0;

        const totalBids = Math.max(bidsTotal, petCurrentBidTotal);

        // Highest bid on the platform
        const topPet = await Pet.findOne().sort({ currentBid: -1 });
        const highestBid = topPet ? (topPet.currentBid || 0) : 0;

        return res.status(200).json({
            success: true,
            data: {
                totalPets,
                totalBids,
                highestBid,
            },
        });
    } catch (error) {
        console.error("Get pet stats error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch platform stats",
            error: error.message,
        });
    }
};

// Get last 20 new pet entries ordered by creation time (only paid pets)
const getNewPets = async (req, res) => {
    try {
        const pets = await Pet.find({ currentBid: { $gt: 0 } }).sort({ createdAt: -1 }).limit(20);

        return res.status(200).json({
            success: true,
            count: pets.length,
            data: pets,
        });
    } catch (error) {
        console.error("Get new pets error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch new pets",
            error: error.message,
        });
    }
};

// Search pets by petName, ownerName, or breed (only paid pets)
const searchPets = async (req, res) => {
    try {
        const query = (req.query.q || req.params.petName || "").trim();

        if (!query) {
            const pets = await Pet.find({ currentBid: { $gt: 0 } }).sort({ currentBid: -1, createdAt: -1 });
            return res.status(200).json({
                success: true,
                count: pets.length,
                data: pets,
            });
        }

        const pets = await Pet.find({
            currentBid: { $gt: 0 },
            $or: [
                { petName: { $regex: query, $options: "i" } },
                { ownerName: { $regex: query, $options: "i" } },
                { breed: { $regex: query, $options: "i" } },
            ],
        }).sort({ currentBid: -1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: pets.length,
            data: pets,
        });
    } catch (error) {
        console.error("Search pets error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to search pets",
            error: error.message,
        });
    }
};

module.exports = {
    uploadPetImageController,
    createPet,
    getPet,
    getAllPets,
    getPetsByCountry,
    getPetsByCity,
    searchPetsByName,
    searchPets,
    getPetsByType,
    incrementPetViews,
    getPetStats,
    getNewPets,
};