import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB connection success!");
});

import serviceRoutes from "./routes/serviceRoutes.js";
import serviceItemRoutes from "./routes/ServiceItemsRoutes.js";

app.use("/services", serviceRoutes);
app.use("/items", serviceItemRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
});

