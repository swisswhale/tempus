const mongoose = require("mongoose");

// Watch Schema
const watchSchema = new mongoose.Schema({
    brand: { type: String, required: true }, // Brand name (e.g., Rolex, Omega)
    model: { type: String, required: true }, // Model name (e.g., Submariner, Speedmaster)
    referenceNumber: { type: String, trim: true, default: null, set: v => v === "" ? null : v }, // Unique Ref Number Optional
    
    // Movement & Caliber Details
    movement: { type: String, required: false }, // Movement type (e.g., Automatic, Quartz)
    caliberMovement: { type: String, required: false }, // Specific caliber/movement number
    baseCaliber: { type: String, required: false }, // Base caliber of the movement
    powerReserve: { type: Number, required: false }, // Power reserve in hours
    numberOfJewels: { type: Number, required: false }, // Number of jewels in movement

    // Case Details
    caseMaterial: { type: String, required: false }, // Case material (e.g., Stainless Steel, Gold)
    caseDiameter: { type: Number, required: false }, // Diameter in mm
    waterResistance: { type: String, required: false }, // Water resistance rating (e.g., 100m)
    bezelMaterial: { type: String, required: false }, // Bezel material (e.g., Ceramic, Stainless Steel)
    crystal: { type: String, required: false }, // Crystal type (e.g., Sapphire, Acrylic)

    // Dial & Aesthetics
    dial: { type: String, required: false }, // Dial color and style
    braceletMaterial: { type: String, required: false }, // Bracelet material (e.g., Stainless Steel, Leather)
    braceletColor: { type: String, required: false }, // Bracelet color
    clasp: { type: String, required: false }, // Type of clasp (e.g., Deployant, Buckle)
    claspMaterial: { type: String, required: false }, // Clasp material

    // Production & Ownership Details
    yearOfProduction: { type: Number, required: false }, // Year of manufacture
    condition: {
        type: String,
        enum: ["New", "Like New & Unworn", "Excellent", "Good", "Fair", "Poor"],
        required: false
    }, // Condition rating
    gender: { type: String, enum: ["Men's", "Women's", "Unisex"], required: false }, // Gender category
    location: { type: String, required: false }, // Location of the watch

    // Pricing & Financial Tracking
    purchasePrice: { type: Number, required: false }, // Price paid by the user
    marketValue: { type: Number, required: false }, // Current market value
    currency: { type: String, default: "USD" }, // Currency for price values
    purchaseDate: { type: Date, required: false }, // Purchase date
    seller: { type: String, required: false }, // Seller or store name

    // Additional Features & Metadata
    boxPapers: { type: Boolean, default: false }, // Whether the watch includes original box & papers
    functions: [{ type: String }], // List of functions (e.g., Chronograph, GMT)
    other: { type: String, required: false }, // Miscellaneous additional information
    images: [{ type: String }], // Array of image URLs (e.g., Cloudinary/AWS links)
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the watch was added
});

// Add a full-text search index
watchSchema.index({ brand: "text", model: "text", referenceNumber: "text" });

// Create and export the model
const Watch = mongoose.model("Watch", watchSchema);
module.exports = Watch;