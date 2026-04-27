import express from "express";
const router = express.Router();

import { register, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

//public routes
router.post("/register", register);
router.post("/login", login);

//protected route example
router.get("/profile", protect, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user});
});

export default router;