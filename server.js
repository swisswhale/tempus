// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// Import modules
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

const app = express();

// Import routes
const indexRoute = require("./routes/index.js");

// Import data sets
const caseMaterial = require("./data/case/case_mat");
const brands = require("./data/basics/brands.js");
const gender = require("./data/basics/gender.js");
const crystalMaterial = require("./data/case/crystal_mat.js");
const bezelMaterial = require("./data/case/bezel_mat.js");
const dialColor = require("./data/dial/color.js");
const braceletMaterial = require("./data/strap/strap_mat.js");
const braceletColor = require("./data/strap/color.js");
const movement = require("./data/movement/movement.js");
const watchFunctions = require("./data/movement/functions.js");
const specialFeatures = require("./data/other.js");

// Import watch schema
const Watch = require("./models/Watch");

// Database connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Set view engine
app.set("view engine", "ejs");

// Routes
app.use(indexRoute);

app.get("/", async (req, res) => {
    res.render("home.ejs");
});

app.get("/new", (req, res) => {
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

app.get("/watches/:id", async (req, res) => {
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

app.post("/watches", async (req, res) => {
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

        const newWatch = new Watch(req.body);
        await newWatch.save();

        res.redirect("/watches");
    } catch (err) {
        console.error("Error saving watch:", err);
        res.status(500).send("Error adding watch.");
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});