import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export const protect = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// exports.protect = (req, res, next) => {
//     const authHeader = req.header.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "No token provided" });
//     }
//     try{
//         const token = authHeader.split(" ")[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.userId = decoded;
//         next();
//     }
//     catch(error){
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

