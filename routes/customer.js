const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Order = require("../models/order");

// Customer view
router.get("/", async (req, res) => {
    const items = await Item.find();
    res.render("customer", { items });
});

// Submit order
router.post("/submit-order", async (req, res) => {
    try {
        const { customerName, customerPhone, items, totalPrice } = req.body;
        const order = await Order.create({
            customerName,
            customerPhone,
            items,
            totalPrice
        });

        // Send WhatsApp message
        const message = `New Order #${order._id}\n\nCustomer: ${customerName}\nPhone: ${customerPhone}\n\nItems:\n${items.map(item => `${item.name} x${item.quantity} - $${item.price * item.quantity}`).join('\n')}\n\nTotal: $${totalPrice}`;
        
        // You can integrate WhatsApp API here
        // For now, just console log the message
        console.log('WhatsApp message:', message);

        res.status(200).json({ success: true, orderId: order._id });
    } catch (error) {
        console.error('Order submission error:', error);
        res.status(500).json({ success: false, error: "Failed to submit order" });
    }
});

module.exports = router;