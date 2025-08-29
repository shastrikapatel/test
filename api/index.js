import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Item from "../../models/Item";
import Order from "../../models/Order";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection caching (for serverless)
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// GET all items
app.get("/api/items", async (req, res) => {
  await connectToDatabase();
  const items = await Item.find();
  res.json(items);
});

// POST order
app.post("/api/order", async (req, res) => {
  try {
    await connectToDatabase();
    const { customerName, customerPhone, items } = req.body;
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      customerName,
      customerPhone,
      items,
      totalPrice
    });
    res.status(200).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

export default app;
