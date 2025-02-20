// Load env variables
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

// import modules
const express = require("express");
const mongoose = require('mongoose'); // require package
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const path = require("path")

// import data sets
const caseMaterial = require('./data/Case/case_mat'); // import case materials
const brands = require('./data/basics/brands');
const gender = require('./data/basics/gender')
const crystalMaterial = require('./data/case/crystal_mat');
const bezelMaterial = require('./data/case/bezel_mat')
const dialColor = require('./data/Dial/color')
const braceletMaterial = require('./data/Strap/strap_mat')
const braceletColor = require('./data/Strap/color')
const movement = require('./data/movement/movement')
const watchFunctions = require('./data/movement/functions')
const specialFeatures = require('./data/other')

const app = express();

// ✅ Set EJS as the templating engine
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

// ✅ Route to render the form (Corrected version)
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

// ✅ Get all watches
app.get("/watches", async (req, res) => {
    const watches = await Watch.find();
    res.render("index.ejs", { watches });
});

// Get form to add watch
// app.get("/new", (req, res) => {
//    res.render("new.ejs");
//})

// ✅ Handle watch form submission
app.post("/watches", async (req, res) => {
    try {
        const newWatch = await Watch.create(req.body);
        res.redirect("/watches");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding watch.");
    }
});

// ✅ Render the homepage
app.get("/", async (req, res) => {
    res.render("home.ejs");
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});