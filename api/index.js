const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// MongoDB connection (optimized for Vercel)
let isConnected = false;
async function connectDB() {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    isConnected = true;
}

// Ensure DB connection before each request
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
const adminRoutes = require("../routes/admin");
const customerRoutes = require("../routes/customer");

app.use("/admin", adminRoutes);
app.use("/", customerRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to Price List App");
});

module.exports = app;
