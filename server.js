// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/db");
const cors = require("cors");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// 🔹 Simple CORS for now (allow everything)
app.use(cors());

// OR if you want just localhost for dev:
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Shopping Website API is running...");
});

// API routes
app.use("/api/auth", require("./backend/routes/authRoutes"));
app.use("/api/users", require("./backend/routes/userRoutes"));
app.use("/api/products", require("./backend/routes/productRoutes"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
