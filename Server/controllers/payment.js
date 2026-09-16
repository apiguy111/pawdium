const dodo = require("../services/dodo");
const Bid = require("../models/bid");
const Pet = require("../models/pet");

const handleWebhook = async (req, res) => {
    try {
        // req.body must be the RAW request body
        const rawBody = req.body.toString();

        const event = dodo.webhooks.unwrap(rawBody, {
            headers: {
                "webhook-id": req.headers["webhook-id"],
                "webhook-signature": req.headers["webhook-signature"],
                "webhook-timestamp": req.headers["webhook-timestamp"],
            },
        });

        console.log("Dodo webhook received:", event.type);

        /*
         * We only care about successful payments for now.
         */
        if (event.type === "payment.succeeded") {
            await handlePaymentSucceeded(event);
        }

        /*
         * Payment failed
         */
        else if (event.type === "payment.failed") {
            await handlePaymentFailed(event);
        }

        /*
         * Payment processing
         */
        else if (event.type === "payment.processing") {
            await handlePaymentProcessing(event);
        }

        /*
         * Payment cancelled
         */
        else if (event.type === "payment.cancelled") {
            await handlePaymentCancelled(event);
        }

        // Always acknowledge successful webhook processing
        return res.status(200).json({
            success: true,
            received: true,
        });

    } catch (error) {
        console.error("Dodo webhook error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid webhook",
        });
    }
};


/*
 * PAYMENT SUCCESS
 */
const handlePaymentSucceeded = async (event) => {
    const payment = event.data;

    console.log("Payment succeeded:", payment);

    /*
     * We will retrieve our Bid using the metadata
     * attached while creating the Dodo checkout session.
     */

    const metadata = payment.metadata || {};

    const { bidId, petId } = metadata;

    if (!bidId || !petId) {
        console.error("Missing bidId or petId in payment metadata");
        return;
    }

    const bid = await Bid.findById(bidId);

    if (!bid) {
        console.error("Bid not found:", bidId);
        return;
    }

    /*
     * Idempotency:
     *
     * Dodo may retry a webhook.
     * If we've already processed this payment,
     * don't process it again.
     */

    if (bid.status === "succeeded") {
        console.log("Bid already processed:", bidId);
        return;
    }

    /*
     * Mark payment as successful.
     */
    bid.status = "succeeded";

    /*
     * Dodo's payment ID.
     *
     * Depending on the current event payload, this is
     * normally available as payment_id.
     */
    if (payment.payment_id) {
        bid.dodoPaymentId = payment.payment_id;
    }

    await bid.save();

    /*
     * IMPORTANT:
     *
     * Never blindly replace currentBid with this bid.
     *
     * A different user could have already submitted
     * a higher successful bid.
     */

    const updatedPet = await Pet.findOneAndUpdate(
        {
            _id: petId,
            currentBid: { $lt: bid.amount },
        },
        {
            $set: {
                currentBid: bid.amount,
            },
        },
        {
            new: true,
        }
    );

    if (!updatedPet) {
        console.log(
            `Bid ${bid.amount} did not become the current bid for pet ${petId}`
        );

        return;
    }

    /*
     * Recalculate leaderboard rankings.
     */
    await updatePetRankings();

    console.log(
        `Pet ${petId} successfully updated to bid $${bid.amount}`
    );
};


/*
 * PAYMENT FAILED
 */
const handlePaymentFailed = async (event) => {
    const payment = event.data;

    const metadata = payment.metadata || {};

    if (!metadata.bidId) {
        return;
    }

    await Bid.findByIdAndUpdate(
        metadata.bidId,
        {
            status: "failed",
        }
    );

    console.log("Bid payment failed:", metadata.bidId);
};


/*
 * PAYMENT PROCESSING
 */
const handlePaymentProcessing = async (event) => {
    const payment = event.data;

    const metadata = payment.metadata || {};

    if (!metadata.bidId) {
        return;
    }

    await Bid.findByIdAndUpdate(
        metadata.bidId,
        {
            status: "processing",
        }
    );

    console.log("Bid payment processing:", metadata.bidId);
};


/*
 * PAYMENT CANCELLED
 */
const handlePaymentCancelled = async (event) => {
    const payment = event.data;

    const metadata = payment.metadata || {};

    if (!metadata.bidId) {
        return;
    }

    await Bid.findByIdAndUpdate(
        metadata.bidId,
        {
            status: "failed",
        }
    );

    console.log("Bid payment cancelled:", metadata.bidId);
};


/*
 * UPDATE PET RANKINGS
 *
 * Highest currentBid = #1
 *
 * Equal bids:
 * older pet keeps the higher position.
 */
const updatePetRankings = async () => {
    const pets = await Pet.find({
        currentBid: { $gt: 0 },
    })
        .sort({
            currentBid: -1,
            createdAt: 1,
        })
        .select("_id");

    if (!pets.length) {
        return;
    }

    const bulkOperations = pets.map((pet, index) => ({
        updateOne: {
            filter: {
                _id: pet._id,
            },
            update: {
                $set: {
                    rank: index + 1,
                },
            },
        },
    }));

    await Pet.bulkWrite(bulkOperations);
};


module.exports = {
    handleWebhook,
};