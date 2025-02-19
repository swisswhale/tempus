// Load env variables
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

// import modules
const express = require("express");
const mongoose = require('mongoose'); // require package
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const path = require("path")

const app = express();


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

// Get all watches
app.get("/watches", async (req, res) => {
    const watches = await Watch.find();
    res.render("index.ejs", { watches });
});

// Get form to add watch
app.get("/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/watches", async (req, res) => {
    try {
        const newWatch = await Watch.create(req.body);
        res.redirect("/watches");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding watch.");
    }
});

app.get("/", async (req, res) => {
    res.render("home.ejs");
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});