const DodoPayments = require("dodopayments");

const dodo = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT || "test_mode",
    webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET,
});

module.exports = dodo;