import mongoose from 'mongoose';
import dotenv from "dotenv";
import { createAdminIfNotExists } from '../Init/Init.js';
dotenv.config();
export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        createAdminIfNotExists();
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Failed to connect to MongoDB", error.message);
    }
}