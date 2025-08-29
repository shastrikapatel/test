const express = require("express");
const router = express.Router();
const Order = require("../models/order"); // lowercase o

// Save customer order
router.post("/", async (req, res) => {
    try {
        const { customerNumber, items, grandTotal } = req.body;
        console.log("Received order:", req.body); // 🔹 log input
        const order = new Order({ customerNumber, items, grandTotal });
        await order.save();
        res.status(200).json({ message: "Order saved" });
    } catch (err) {
        console.error("Error saving order:", err); // 🔹 log error
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
