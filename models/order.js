import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  items: [{ name: String, price: Number, quantity: Number }],
  totalPrice: Number,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
