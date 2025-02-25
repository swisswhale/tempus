const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

router.get("/register", (req, res) => {
    res.render("auth/register");
});

router.post("/register", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send("Username already taken.");
    };
    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match");
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);

    req.session.user = { username: user.username };

    res.redirect("/watches");
});

router.get("/login", (req, res) => {
    res.render("auth/login")
});

router.post("/login", async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });

        if (!userInDatabase) {
            return res.status(400).send("Invalid username or password.");
        }

        req.session.user = {
            _id: userInDatabase._id,
            username: userInDatabase.username
        };

        res.redirect("/watches");
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).send("Server error.");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.send("Error logging out");
        }
        res.redirect("/login");
    });

    module.exports = router;

});

module.exports = router;