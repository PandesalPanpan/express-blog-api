import { Router } from "express";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

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
})


// (Ask AI where to put the folder for JWT that verifies and signs)

// Register Route


// Test Route

// Refresh Route???

export default router;