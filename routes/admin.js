const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Order = require("../models/order");

// Admin dashboard
router.get("/", async (req, res) => {
    const items = await Item.find();
    const orders = await Order.find().sort({ createdAt: -1 });
    res.render("admin", { items, orders });
});

// ... existing item routes ...

// Update order status
router.post("/order/update-status/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

        // Send WhatsApp message to customer
        const message = `Order Status Update\n\nOrder #${order._id}\nStatus: ${status}\n\nThank you for your business!`;
        console.log('Status update message:', message);

        res.redirect("/admin");
    } catch (error) {
        console.error('Status update error:', error);
        res.status(500).send("Error updating order status");
    }
});

module.exports = router;