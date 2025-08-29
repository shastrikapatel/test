require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB connection pooling
let isConnected = false;
async function connectDB() {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    isConnected = true;
}

// Connect DB for every request (serverless safe)
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
const adminRoutes = require("./routes/admin");
const customerRoutes = require("./routes/customer");
const orderRoutes = require("./routes/order");

app.use("/admin", adminRoutes);
app.use("/", customerRoutes);
app.use("/order", orderRoutes);

// Local testing
if (process.env.NODE_ENV !== "production") {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
