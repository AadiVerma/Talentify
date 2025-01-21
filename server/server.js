import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import Talent from "./Models/TalentModel.js";
import cors from "cors"; 
import dotenv from "dotenv";

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/talent", upload.single("photo"), async (req, res) => {
  const { name, skills, description } = req.body;
  const photo = req.file ? req.file.path : null;

  try {
    const newTalent = new Talent({
      name,
      skills,
      description,
      photo,
    });

    await newTalent.save();
    res.status(201).json({ message: "Talent added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save talent", error: error.message });
  }
});

// GET endpoint to fetch all talents
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
