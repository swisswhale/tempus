const express = require("express");
const router = express.Router();
const Watch = require("../models/Watch");

// Import basic attributes
const brands = require("../data/basics/brands.js");
const gender = require("../data/basics/gender.js");

// box not a sep data set
// papers not a sep data set

// Import case attributes
const caseMaterial = require("../data/case/case_mat");
const bezelMaterial = require("../data/case/bezel_mat.js");
const crystalMaterial = require("../data/case/crystal_mat.js");

// Import dial attributes
// dialStyle not a sep data set
const dialColor = require("../data/dial/color.js");

// Import strap attributes
const braceletMaterial = require("../data/strap/strap_mat.js");
const braceletColor = require("../data/strap/color.js");

// Import movement attributes
const movement = require("../data/movement/movement.js");
const watchFunctions = require("../data/movement/functions.js");
const specialFeatures = require("../data/other.js");


// GET Route: Render Edit Form
router.get("/watches/:id/edit", async (req, res) => {
    try {
        const watch = await Watch.findById(req.params.id);
        if (!watch) {
            return res.status(404).send("Watch not found");
        }

        res.render("edit", {
            watch,
            brands,
            gender,
            caseMaterial,
            bezelMaterial,
            crystalMaterial,
            dialColor,
            braceletMaterial,
            braceletColor,
            movement,
            watchFunctions,
            specialFeatures
        });
    } catch (error) {
        console.error("Error retrieving watch for edit:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;

// PUT Route: Update Watch Data
router.put("/watches/:id", async (req, res) => {
    try {
        req.body.watchFunctions = req.body["watchFunctions[]"]
            ? Array.isArray(req.body["watchFunctions[]"])
                ? req.body["watchFunctions[]"]
                : [req.body["watchFunctions[]"]]
            : [];

        req.body.specialFeatures = req.body["specialFeatures[]"]
            ? Array.isArray(req.body["specialFeatures[]"])
                ? req.body["specialFeatures[]"]
                : [req.body["specialFeatures[]"]]
            : [];

        delete req.body["watchFunctions[]"];
        delete req.body["specialFeatures[]"];

        const updatedWatch = await Watch.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedWatch) {
            return res.status(404).send("Watch not found");
        }

        res.redirect(`/watches/${req.params.id}`);
    } catch (error) {
        console.error("Error updating watch:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;