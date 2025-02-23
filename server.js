// Load env variables
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

// import modules
const express = require("express");
const mongoose = require('mongoose'); // require package
const methodOverride = require("method-override");
const morgan = require("morgan"); //new
const path = require("path")


// import data sets
const caseMaterial = require(path.join(__dirname, "data/case/case_mat.js"));
const brands = require(path.join(__dirname, "data/basics/brands.js"));
const gender = require(path.join(__dirname, "data/basics/gender.js"));
const crystalMaterial = require(path.join(__dirname, "data/case/crystal_mat.js"));
const bezelMaterial = require(path.join(__dirname, "data/case/bezel_mat.js"));
const dialColor = require(path.join(__dirname, "data/dial/color.js"));
const braceletMaterial = require(path.join(__dirname, "data/strap/strap_mat.js"));
const braceletColor = require(path.join(__dirname, "data/strap/color.js"));
const movement = require(path.join(__dirname, "data/movement/movement.js"));
const watchFunctions = require(path.join(__dirname, "data/movement/functions.js"));
const specialFeatures = require(path.join(__dirname, "data/other.js"));

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Import watch schema
const Watch = require("./models/Watch");

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Mount it along with our other middleware, ABOVE the routes
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

app.use(express.static(path.join(__dirname, "public")));


// Routes

// Route to render the form (Corrected version)
app.get('/new', (req, res) => {
    console.log("Brands:", brands);
    console.log("Case Material:", caseMaterial);
    console.log("Crystal Material:", crystalMaterial);
    console.log("Bezel Material:", bezelMaterial);
    console.log("Dial Color:", dialColor);
    console.log("Bracelet Material:", braceletMaterial);
    console.log("Bracelet Color:", braceletColor);

    res.render('new', {
        brands, gender, caseMaterial, crystalMaterial, bezelMaterial,
        dialColor, braceletMaterial, braceletColor, movement, watchFunctions,
        specialFeatures
    }); // pass datasets
});

// Get all watches
app.get("/watches", async (req, res) => {
    const watches = await Watch.find();
    res.render("index.ejs", { watches });
});

// Get Specific Watch

app.get("/watches/:id", async (req, res) => {
    try {
        const watch = await Watch.findById(req.params.id);
        if (!watch) {
            return res.status(404).send("Watch not found");
        }

        console.log("Retrieved Watch Data:", watch); // 🔍 Debugging step

        res.render("details", { watch });
    } catch (error) {
        console.error("Error retrieving watch:", error);
        res.status(500).send("Server error");
    }
});

// Get form to add watch
// app.get("/new", (req, res) => {
//    res.render("new.ejs");
//})

// Handle watch form submission
app.post("/watches", async (req, res) => {
    try {
        console.log("Raw Form Data Received:", req.body); // 🔍 Debugging step

        // Extract checkbox values correctly
        req.body.watchFunctions = req.body["watchFunctions[]"]
            ? (Array.isArray(req.body["watchFunctions[]"]) ? req.body["watchFunctions[]"] : [req.body["watchFunctions[]"]])
            : [];

        req.body.specialFeatures = req.body["specialFeatures[]"]
            ? (Array.isArray(req.body["specialFeatures[]"]) ? req.body["specialFeatures[]"] : [req.body["specialFeatures[]"]])
            : [];

        // Remove old incorrect fields (optional)
        delete req.body["watchFunctions[]"];
        delete req.body["specialFeatures[]"];

        console.log("Processed Watch Data:", req.body); // 🔍 Debugging step

        const newWatch = new Watch(req.body);
        await newWatch.save();

        res.redirect("/watches");
    } catch (err) {
        console.error("Error saving watch:", err);
        res.status(500).send("Error adding watch.");
    }
});

// Edit \\


// Render the homepage
app.get("/", async (req, res) => {
    res.render("home.ejs");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});