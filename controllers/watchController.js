const express = require("express");
const router = express.Router();
const Watch = require("../models/Watch");

router.get("/watches", (req, res) => {
    res.render("index.ejs", {
        user: req.session.user,
    });
});

router.get("/watches/:id", async (req, res) => {
    try {
        const watch = await Watch.findById(req.params.id);
        if (!watch) {
            return res.status(404).send("Watch not found");
        }
        res.render("details", { watch });
    } catch (error) {
        console.error("Error retrieving watch:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;