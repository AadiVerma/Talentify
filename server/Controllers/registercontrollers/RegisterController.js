import User from "../../Models/UserModel.js";
import JobSeeker from "../../Models/JobSeeker.js";
import cloudinary from "../../Config/cloudinary.js";
import { Readable } from "stream";
import { SendAdminRequest } from "../../Services/AdminRequest.js";

const bufferToStream = (buffer) => {
  return Readable.from(buffer);
};
const RegisterController = async (req, res) => {
  const {
    firstname,
    lastname,
    description,
    email,
    skills,
    experience,
    userId,
  } = req.body;
  console.log(req.body);
  const file = req.file;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
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
    const newJobSeeker = new JobSeeker({
      firstname,
      lastname,
      description,
      email,
      skills: JSON.parse(skills),
      experience: Number(experience),
      profilepic: photoUrl, // Save the Cloudinary URL to the profilepic field
      user: userId,
    });

    user.jobseeker = newJobSeeker._id;
    user.role = "job-seeker"; 
    await user.save();
    await newJobSeeker.save();
    SendAdminRequest({name:firstname+" "+lastname,email:email,skills:skills,description});
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
    console.log("cffefedede");
    const talents = await JobSeeker.find();
    res.status(200).json(talents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch talents", error: error.message });
  }
};
const GetTalentsNotApproved = async (req, res) => {
  try {
    const talents = await JobSeeker.find({ approve: false });
    res.status(200).json({ approved: false, talents });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch not approved talents",
      error: error.message,
    });
  }
};

const UpdateJobSeekerApproval = async (req, res) => {
  console.log(req.body);
  const { id, approve } = req.body;
  console.log("id", id);

  try {
    const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(id, {
      approve: approve,
    });

    if (!updatedJobSeeker) {
      return res.status(404).json({ message: "JobSeeker not found" });
    }

    res.status(200).json({
      message: "JobSeeker approval updated successfully",
      jobSeeker: updatedJobSeeker,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update JobSeeker approval",
      error: error.message,
    });
  }
};

export {
  RegisterController,
  GetTalentsController,
  GetTalentsNotApproved,
  UpdateJobSeekerApproval,
};
