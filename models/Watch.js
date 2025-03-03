const mongoose = require("mongoose");
const specialFeatures = require("../data/other");

const watchSchema = mongoose.Schema({

    // Basics
    brand: { type: String, required: true },
    model: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    refNumber: { type: String, required: false, unique: false, sparse: true },
    serialNumber: { type: String, required: false, unique: true },

    // Watch Type
    yearOfProduction: { type: Number, required: false, min: 1799, max: new Date().getFullYear() },
    condition: { type: String, required: false },
    gender: { type: String, required: false },

    // Purchase
    purchasePrice: { type: Number, required: false, min: 0 },
    purchaseDate: { type: Date, required: false },
    seller: { type: String, required: false },

    // Seller Type
    box: { type: Boolean, required: false },
    papers: { type: Boolean, required: false },

    // Case
    caseDiameter: { type: Number, required: false, min: 0 },
    caseMaterial: { type: String, required: false },
    bezelMaterial: { type: String, required: false },
    crystalMaterial: { type: String, required: false },
    waterResistance: { type: Number, required: false, min: 0 },

    // Dial
    dialColor: { type: String, required: false },
    dialStyle: { type: String, required: false },

    // Bracelet
    braceletMaterial: { type: String, required: false },
    braceletColor: { type: String, required: false },

    // Movement
    watchFunctions: { type: [String], default: [] },
    specialFeatures: { type: [String], default: [] },
    movement: { type: String, required: false },

    // Other
    specialFeatures: { type: [String], default: [] },

    // Notes
    notes: { type: String, required: false },

    /* To be added 2.0
    // Clasp
    clasp: { type: String, required: false },
    claspMaterial: { type: String, required: false },

    // Movement
    baseCaliber: { type: String, required: false },
    powerReserve: { type: Number, required: false, min: 0 },
    numberOfJewels: { type: Number, required: false, min: 0 },

    // Timestamps
    createdAt: { type: Date, default: Date.now }
    */
});

watchSchema.index({ brand: "text", model: "text", serialNumber: "text" });

const Watch = mongoose.model("Watch", watchSchema);
module.exports = Watch;
