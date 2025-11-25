const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/db");

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", require("./backend/routes/authRoutes"));
app.use("/api/users", require("./backend/routes/userRoutes"));
app.use("/api/products", require("./backend/routes/productRoutes"));

// Connect to DB and start server
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
