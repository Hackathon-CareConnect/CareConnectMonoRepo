const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure the path is correct
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Hash the password before saving
        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: "User registration failed", error });
    }
});

// Login user
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Debugging log
        console.log("Stored password hash:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        // Debugging log
        console.log("Password match result:", isMatch);

        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({
            message: "Login successful",
            token,
            notification: user.notification, // Assuming you have a 'notification' field in User model
            userId: user.id,
            username: user.username,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
