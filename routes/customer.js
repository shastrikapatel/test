const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Customer page - show all items
router.get("/", async (req, res) => {
    try {
        const items = await Item.find();
        res.render("customer", { items });
    } catch (error) {
        res.render("customer", { items: [] });
    }
});

module.exports = router;
