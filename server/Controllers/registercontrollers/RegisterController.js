import User from "../../Models/UserModel.js";
import JobSeeker from "../../Models/JobSeeker.js";
import cloudinary from "../../Config/cloudinary.js";
import { Readable } from "stream";

const bufferToStream = (buffer) => {
  return Readable.from(buffer);
};

const RegisterController = async (req, res) => {
  const { firstname, lastname, description, email, skills, experience } =
    req.body;
  const file = req.file; // Image file from multer

  try {
    // Handle photo upload to Cloudinary
    let photoUrl = null;
    if (file) {
      try {
        const cloudinaryUpload = new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "job_seekers",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          // Convert buffer to stream and pipe to Cloudinary
          bufferToStream(file.buffer).pipe(stream);
        });

        // Wait for the upload to complete
        const uploadResult = await cloudinaryUpload;
        photoUrl = uploadResult.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    // Create a new JobSeeker with the photo URL
    const newJobSeeker = new JobSeeker({
      firstname,
      lastname,
      description,
      email,
      skills: JSON.parse(skills), // Parse the skills array from form data
      experience: Number(experience),
      profilepic: photoUrl, // Save the Cloudinary URL to the profilepic field
    });

    await newJobSeeker.save();

    res.status(201).json({
      message: "Job Seeker added successfully",
      jobseeker: newJobSeeker,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Failed to save job seeker",
      error: error.message,
    });
  }
};

const GetTalentsController = async (req, res) => {
  try {
    const talents = await JobSeeker.find();
    res.status(200).json(talents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch talents", error: error.message });
  }
};

export { RegisterController, GetTalentsController };
