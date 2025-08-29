const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Admin panel: show all orders
router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.render("order-summary", { orders });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to load orders.");
    }
});

module.exports = router;
