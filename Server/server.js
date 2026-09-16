// const express = require("express");

// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// require("dotenv").config();

// const connectDB = require("./config/db");
// const petRoutes = require("./routes/pet");
// const bidRoutes = require("./routes/bid");

// const app = express();

// connectDB();

// app.use(helmet());

// app.use(
//     cors({
//         origin: process.env.FRONTEND_URL,
//         credentials: true,
//     })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(morgan("dev"));

// // Routes
// app.use("/api/pets", petRoutes);
// app.use("/api/bids", bidRoutes);

// app.get("/", (req, res) => {
//     res.json({
//         success: true,
//         message: "Pawdium API is running 🐾",
//     });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Pawdium server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();

const connectDB = require("./config/db");

const petRoutes = require("./routes/pet");
const bidRoutes = require("./routes/bid");
const paymentRoutes = require("./routes/payment");
const imagekitRoutes = require("./routes/imagekit");

const app = express();

connectDB();

app.use(helmet());

const allowedOrigins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://192.168.56.1:8080",
    "https://pawdium.lol",
    "https://www.pawdium.lol",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin
            // (Postman, server-to-server requests, etc.)
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error(`CORS blocked origin: ${origin}`)
            );
        },
        credentials: true,
    })
);

/*
 * IMPORTANT:
 * Webhook route must receive the raw body.
 *
 * This must come BEFORE express.json().
 */
app.use(
    "/api/payments/webhook",
    express.raw({ type: "application/json" })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));


/*
 * Root
 */
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Pawdium API is running 🐾",
    });
});


/*
 * Routes
 */
app.use("/api/pets", petRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/imagekit", imagekitRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Pawdium server running on port ${PORT}`);
});