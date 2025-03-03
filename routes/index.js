const express = require("express");
const router = express.Router();
const Watch = require("../models/Watch");

router.get("/watches", async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect("/auth/login");
        }

        const watches = await Watch.find({ user: req.session.user._id });
        res.render("index.ejs", { watches });
    } catch (error) {
        console.error("Error fetching watches:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;