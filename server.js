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
const deleteRoute = require("./routes/delete.js");
const newRoute = require("./routes/new.js");

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
app.use(deleteRoute);
app.use(newRoute);

app.get("/", async (req, res) => {
    res.render("home.ejs");
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



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});