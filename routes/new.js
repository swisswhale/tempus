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

router.get("/new", (req, res) => {
    res.render("new", {
        brands,
        gender,
        caseMaterial,
        crystalMaterial,
        bezelMaterial,
        dialColor,
        braceletMaterial,
        braceletColor,
        movement,
        watchFunctions,
        specialFeatures,
    });
});

router.post("/watches", async (req, res) => {
    try {
        console.log("Session user:", req.session.user); // Debugging

        if (!req.session.user) {
            return res.status(401).send("Unauthorized: Please log in.");
        }

        req.body.user = req.session.user._id; // Ensure the user is assigned

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

        const newWatch = new Watch(req.body);
        await newWatch.save();

        res.redirect("/watches");
    } catch (err) {
        console.error("Error saving watch:", err);
        res.status(500).send("Error adding watch.");
    }
});

module.exports = router;