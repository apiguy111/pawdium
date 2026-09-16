const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
    {
        petName: {
            type: String,
            required: true,
            trim: true,
        },

        ownerName: {
            type: String,
            required: true,
            trim: true,
        },

        petType: {
            type: String,
            required: true,
        },

        breed: {
            type: String,
            trim: true,
            default: "Standard",
        },

        country: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        about: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        imageUrl: {
            type: String,
            required: true,
            trim: true,
        },

        currentBid: {
            type: Number,
            default: 0,
            min: 0,
        },

        rank: {
            type: Number,
            default: null,
            min: 1,
        },
        views: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;