import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import Talent from "./Models/TalentModel.js";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(cors());
app.use(express.json());

// Configure multer for memory storage instead of disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/talent", upload.single("photo"), async (req, res) => {
  const { name, skills, description } = req.body;
  
  try {
    let photoUrl = null;
    
    if (req.file) {
      // Convert buffer to base64
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      
      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: 'talent_photos',
      });
      
      photoUrl = uploadResponse.secure_url;
    }

    const newTalent = new Talent({
      name,
      skills,
      description,
      photo: photoUrl,
    });

    await newTalent.save();
    res.status(201).json({ 
      message: "Talent added successfully",
      photo: photoUrl 
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save talent", error: error.message });
  }
});

app.get("/api/talents", async (req, res) => {
  try {
    const talents = await Talent.find();
    res.status(200).json(talents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch talents", error: error.message });
  }
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});