const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
    {
        petId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pet",
            required: true,
            index: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 1,
        },

        previousBid: {
            type: Number,
            default: 0,
            min: 0,
        },

        currency: {
            type: String,
            default: "USD",
            uppercase: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "processing",
                "succeeded",
                "failed",
            ],
            default: "pending",
            index: true,
        },

        dodoPaymentId: {
            type: String,
            index: true,
            sparse: true,
        },

        dodoSessionId: {
            type: String,
            index: true,
            sparse: true,
        },

        dodoEventId: {
            type: String,
            unique: true,
            sparse: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Bid", bidSchema);