const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerNumber: { type: String, required: true },
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    grandTotal: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
