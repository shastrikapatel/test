const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Order = require("../models/order"); // lowercase o


// Admin dashboard
router.get("/", async (req, res) => {
    const items = await Item.find();
    const orders = await Order.find().sort({ date: -1 });
    res.render("admin", { items, orders });
});

// Add new item
router.post("/add", async (req, res) => {
    const { name, price } = req.body;
    await Item.create({ name, price });
    res.redirect("/admin");
});

// Update item
router.post("/update/:id", async (req, res) => {
    const { name, price } = req.body;
    await Item.findByIdAndUpdate(req.params.id, { name, price });
    res.redirect("/admin");
});

// Delete item
router.post("/delete/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
});

module.exports = router;
