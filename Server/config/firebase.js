const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const serviceAccount = require("../firebase-service-account.json");

const app = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "pawdium-e4710.firebasestorage.app",
});

const bucket = getStorage(app).bucket();

module.exports = {
    app,
    bucket,
};