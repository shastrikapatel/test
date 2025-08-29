const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    items: [
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalPrice: Number,
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
