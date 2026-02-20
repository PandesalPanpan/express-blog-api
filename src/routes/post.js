import { Router } from "express";
import auth from "../middleware/auth.js";
import * as postController from '../controllers/postController.js'

const router = Router();

// Public Routes
router.get("/:postId", postController.show)
router.get("/", postController.index);

// Protected Routes
router.use(auth)

router.get("/test", (req, res) => {
    return res.json("Working Protected Route")
})

export default router;