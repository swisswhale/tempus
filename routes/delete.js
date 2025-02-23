const express = require("express");
const router = express.Router();
const Watch = require("../models/Watch");

// DELETE a watch entry
router.delete("/watches/:id", async (req, res) => {
    try {
        const watch = await Watch.findByIdAndDelete(req.params.id);
        if (!watch) {
            return res.status(404).send("Watch not found");
        }
        res.redirect("/watches");
    } catch (error) {
        console.error("Error deleting watch:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;