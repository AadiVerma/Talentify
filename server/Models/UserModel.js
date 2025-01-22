import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  profilephoto: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["job-seeker", "admin", "hirer"],
    default: "job-seeker",
  },
  jobseeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeeker",
    
  },
  status: {
    type: String,
    enum: ["rejected", "hired", "pending"],
    default: "pending",
  },
  liked: {
    type: [mongoose.Schema.Types.ObjectId], // Reference JobSeekers liked by this user
    ref: "JobSeeker",
  },
});

export default mongoose.model("User", userSchema);
