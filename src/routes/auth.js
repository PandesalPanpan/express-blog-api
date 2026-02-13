import { Router } from "express";
import jwt from "jsonwebtoken";
import { authController } from '../controllers/index.js';

const router = Router();

// Login Route
router.post("/login", (req, res) => {
    // For now just immediately verify a test user
    const user = {
        name: "Peter"
    };
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '1h' });

    res.json({
        token
    });
})

// Register Route
router.post("/register", authController.register);


// Test Route
router.get("/test", authController.test);

// Refresh Route???

export default router;