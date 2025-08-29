const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Order = require("../models/order");

// Show all items
router.get("/", async (req, res) => {
    const items = await Item.find();
    res.render("customer", { items });
});

// Handle order submission
router.post("/order", async (req, res) => {
    try {
        const { customerName, customerPhone, items } = req.body;
        let parsedItems = Array.isArray(items) ? items : [items];
        let totalPrice = parsedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        await Order.create({
            customerName,
            customerPhone,
            items: parsedItems,
            totalPrice
        });
        res.send("Order placed successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to place order.");
    }
});

module.exports = router;
