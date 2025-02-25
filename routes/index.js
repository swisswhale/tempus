const express = require("express");
const router = express.Router();
const Watch = require("../models/Watch"); // Ensure correct path to the Watch model

router.get("/watches", async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect("/auth/login"); // Redirect if not logged in
        }

        const watches = await Watch.find({ user: req.session.user._id }); // Fetch only user's watches
        res.render("index.ejs", { watches });
    } catch (error) {
        console.error("Error fetching watches:", error);
        res.status(500).send("Server error");
    }
});

// Export the router
module.exports = router;