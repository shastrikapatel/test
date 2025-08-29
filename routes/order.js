const express = require("express");
const router = express.Router();
const Order = require("../models/order"); // lowercase o

// Save customer order
router.post("/", async (req, res) => {
    try {
        const { customerNumber, items, grandTotal } = req.body;
        const order = new Order({ customerNumber, items, grandTotal });
        await order.save();
        res.status(200).json({ message: "Order saved" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
