import express from "express";
const router = express.Router();

import { register, login, updateProfile, deleteAccount} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

//public routes
router.post("/register", register);
router.post("/login", login);

router.put("/update",protect, updateProfile)
router.delete("/delete", protect, deleteAccount);

//protected route
router.get("/profile", protect, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user});
});

export default router;