const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Admin page - show all items
router.get("/", async (req, res) => {
    try {
        const items = await Item.find();
        res.render("admin", { items });
    } catch (error) {
        res.status(500).send("Error loading admin view");
    }
});

// Add new item
router.post("/add", async (req, res) => {
    const { name, price } = req.body;
    try {
        const newItem = new Item({ name, price });
        await newItem.save();
        res.redirect("/admin");
    } catch (error) {
        res.status(500).send("Error adding item");
    }
});

// Delete item
router.post("/delete/:id", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.redirect("/admin");
    } catch (error) {
        res.status(500).send("Error deleting item");
    }
});

module.exports = router;
