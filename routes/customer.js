const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Customer page - show items
router.get("/", async (req, res) => {
    const items = await Item.find();
    res.render("customer", { items });
});

module.exports = router;
