const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connect MongoDB (Change to your Atlas URI)
mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/priceListDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
const adminRoutes = require("./routes/admin");
const customerRoutes = require("./routes/customer");

app.use("/admin", adminRoutes);
app.use("/", customerRoutes);

// Export app for Vercel
module.exports = app;
