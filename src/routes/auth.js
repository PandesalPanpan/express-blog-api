import { Router } from "express";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const router = Router();

// Login Route
router.post("/login", (req, res) => {
    // For now just immediately verify a test user
    const user = {
        name: "Peter"
    };
    const token = jwt.sign({user}, process.env.SECRET, { expiresIn: '1h'});

    res.json({
        token
    });

    // Later add a helper or lib for verifying a hash password
})

// (Ask AI where to put the folder for JWT that verifies and signs)

// Register Route


// Test Route

// Refresh Route???

export default router;