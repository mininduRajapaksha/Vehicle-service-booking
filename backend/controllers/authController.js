import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register user
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, telPhone, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        const existingPhone = await User.findOne({ telPhone });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone number is already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            telPhone,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // ✅ RETURN USER DATA (IMPORTANT)
        res.status(200).json({
            token,
            role: user.role,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                telPhone: user.telPhone,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update user
export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId.id;

        const { firstName, lastName, telPhone,email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, telPhone,email },
            { new: true }
        );

        res.status(200).json({
            message: "Profile updated",
            user: {
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                telPhone: updatedUser.telPhone,
                email:updatedUser.email,
                role: updatedUser.role
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};