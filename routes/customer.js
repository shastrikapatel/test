const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Order = require("../models/order"); // lowercase 'o'

const twilio = require("twilio");

// Twilio config
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Customer view
router.get("/", async (req, res) => {
    const items = await Item.find();
    res.render("customer", { items });
});

// Confirm order
router.post("/confirm", async (req, res) => {
    const { customerName, phone, selectedItems } = req.body;
    const itemNames = Array.isArray(selectedItems) ? selectedItems : [selectedItems];
    
    const items = await Item.find({ name: { $in: itemNames } });

    // Save order in DB
    const order = await Order.create({ customerName, phone, items });

    // Send WhatsApp message
    const message = `New Order from ${customerName}\nPhone: ${phone}\nItems:\n${items.map(i => `${i.name} - ₹${i.price}`).join("\n")}`;
    
    await client.messages.create({
        body: message,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${phone}`
    });

    res.send("Order confirmed! You will receive a WhatsApp confirmation.");
});

module.exports = router;
