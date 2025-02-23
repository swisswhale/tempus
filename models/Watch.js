const mongoose = require("mongoose");
const specialFeatures = require("../data/other");

// Watch Schema
const watchSchema = mongoose.Schema({

    // Basics
    brand: { type: String, required: true }, // Dropdown
    model: { type: String, required: true }, // Text input
    refNumber: { type: String, required: false, unique: false, sparse: true }, // Optional Reference Number
    serialNumber: { type: String, required: false, unique: true }, // Unique Serial Number

    // Watch Type
    yearOfProduction: { type: Number, required: false, min: 1900, max: new Date().getFullYear() }, // Year of manufacture
    condition: { type: String, required: false }, // Radio Button
    gender: { type: String, required: false }, // Radio Button

    // Purchase
    purchasePrice: { type: Number, required: false, min: 0 }, // USD
    purchaseDate: { type: Date, required: false }, // mm/dd/yyyy
    seller: { type: String, required: false }, // Text input

    // Seller Type
    box: { type: Boolean, required: false }, // Radio Button (Yes/No)
    papers: { type: Boolean, required: false }, // Radio Button (Yes/No)

    // Case
    caseDiameter: { type: Number, required: false, min: 0 }, // mm
    caseMaterial: { type: String, required: false }, // Dropdown
    bezelMaterial: { type: String, required: false }, // Dropdown
    crystal: { type: String, required: false }, // Dropdown
    waterResistance: { type: Number, required: false, min: 0 }, // ATM

    // Dial
    dialColor: { type: String, required: false }, // Dropdown
    dialStyle: { type: String, required: false }, // Radio Button

    // Bracelet
    braceletMaterial: { type: String, required: false }, // Dropdown
    braceletColor: { type: String, required: false }, // Dropdown

    // Clasp
    clasp: { type: String, required: false }, // Dropdown
    claspMaterial: { type: String, required: false }, // Dropdown

    // Movement
    watchFunctions: { type: [String], default: [] }, // ✅ Stores an array properly
    specialFeatures: { type: [String], default: [] }, // Checkbox list
    caliberMovement: { type: String, required: false }, // Text input
    baseCaliber: { type: String, required: false }, // Text input
    powerReserve: { type: Number, required: false, min: 0 }, // Hours
    numberOfJewels: { type: Number, required: false, min: 0 }, // Count of jewels in movement

    // Other
    specialFeatures: { type: [String], default: [] }, // Checkbox list

    // Notes
    notes: { type: String, required: false }, // Freeform text

    // Timestamps
    createdAt: { type: Date, default: Date.now }
});

// Full-text search index for brand, model, and serial number
watchSchema.index({ brand: "text", model: "text", serialNumber: "text" });

// Create and export the model
const Watch = mongoose.model("Watch", watchSchema);
module.exports = Watch;