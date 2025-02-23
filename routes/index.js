const express = require("express");
const router = express.Router();
const Watch = require("../models/Watch"); // Ensure correct path to the Watch model

// Route to get all watches
router.get("/watches", async (req, res) => {
    try {
        const watches = await Watch.find();
        res.render("index.ejs", { watches });
    } catch (error) {
        console.error("Error fetching watches:", error);
        res.status(500).send("Server error");
    }
});

// Export the router
module.exports = router;