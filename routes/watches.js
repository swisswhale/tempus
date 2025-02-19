//const express = require('express');
//const Watch = require('../models/Watch'); // Adjust the path as needed
//
//const router = express.Router();

// Get all watches
// router.get('/', async (req, res) => {
//   try {
//     const watches = await Watch.find();
//     res.json(watches);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Add a new watch
// router.post('/', async (req, res) => {
//   try {
//     let { referenceNumber, brand, model, price } = req.body;
// 
//     // Convert empty referenceNumber to null
//    if (referenceNumber === '') {
//       referenceNumber = null;
//     }

//    const watch = new Watch({ referenceNumber, brand, model, price });
//    await watch.save();
//    res.status(201).json(watch);
//  } catch (error) {
//    res.status(500).json({ error: error.message });
  }
//}//);

// Add a new watch
//app.post("/watches", async (req, res) => {
//    try {
//        const newWatch = await Watch.create(req.body);
//        res.redirect("/watches");
//    } catch (err) {
//        console.error(err);
//        res.status(500).send("Error adding watch.");
//    }
// });

// module.exports = router; // ✅ Correct CommonJS export