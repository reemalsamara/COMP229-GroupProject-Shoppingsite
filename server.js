const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS configuration
const allowedOrigins = [
    "http://localhost:3000",          // local React dev
    "https://shopstack-frontend.onrender.com"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like Postman, curl)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Shopping Website API is running...");
});

// Routes
app.use("/api/auth", require("./backend/routes/authRoutes"));
app.use("/api/users", require("./backend/routes/userRoutes"));
app.use("/api/products", require("./backend/routes/productRoutes"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
