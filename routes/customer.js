const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Show customer price list
router.get("/", async (req, res) => {
    const items = await Item.find();
    res.render("customer", { items });
});

module.exports = router;
