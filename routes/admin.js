const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Order = require("../models/order"); // lowercase 'o'



// Admin dashboard (View items + orders)
router.get("/", async (req, res) => {
    const items = await Item.find();
    const orders = await Order.find().sort({ createdAt: -1 });
    res.render("admin", { items, orders });
});

// Add new item
router.post("/add", async (req, res) => {
    const { name, price } = req.body;
    await Item.create({ name, price });
    res.redirect("/admin");
});

module.exports = router;
