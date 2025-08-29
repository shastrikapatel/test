const express = require("express");
const router = express.Router();
const connectToDatabase = require("../db");
const Item = require("../models/Item");
const Order = require("../models/order");

// Middleware to connect DB
router.use(async (req, res, next) => {
    await connectToDatabase();
    next();
});

// Routes
router.get("/", async (req, res) => {
    const items = await Item.find();
    res.render("customer", { items });
});

router.post("/order", async (req, res) => {
    try {
        const { customerName, customerPhone, items } = req.body;
        const parsedItems = Array.isArray(items) ? items : [items];
        const totalPrice = parsedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
