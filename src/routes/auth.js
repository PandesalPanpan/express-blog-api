import { Router } from "express";
import jwt from "jsonwebtoken";
import * as authController from '../controllers/authController.js'

const router = Router();

// Register Route
router.post("/register", authController.register);

router.post("/login", authController.login);


// Test Route
// router.get("/test", authController.test);

// Refresh Route???

export default router;