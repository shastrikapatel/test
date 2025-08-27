const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));

// Routes
const adminRoutes = require("../routes/admin");
const customerRoutes = require("../routes/customer");

app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);

// ✅ Show customer view on root
app.get("/", (req, res) => {
    res.render("customer");
});

module.exports = app; // No app.listen() for Vercel
