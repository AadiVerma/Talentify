import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../Models/UserModel.js";
import JobSeeker from "../../Models/JobSeeker.js";
const generateToken = (userId, role, username, email) => {
  return jwt.sign({ userId, role, username, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const signupController = async (req, res) => {
  try {
    const { username, email, password, phoneno } = req.body;

    if (!username || !email || !password || !phoneno) {
      return res.status(400).json({ error: "fill all details" });
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneno)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    if (typeof phoneno !== "string" || !phoneRegex.test(phoneno.trim())) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    if (typeof phoneno !== "string" || !phoneRegex.test(phoneno.trim())) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneno,
    });

    await newUser.save();

    const token = generateToken(
      newUser._id,
      newUser.role,
      newUser.username,
      newUser.email
    );

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token,
    });
  } catch (error) {
    console.error("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "fill all details" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = generateToken(user._id, user.role, user.username, user.email);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      profilePic: user.profilePic,
      token,
    });
  } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("jobseeker");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Debug logs
    console.log("User found:", user);
    console.log("Jobseeker data:", user.jobseeker);
    console.log("Profile picture paths:", {
      userProfilePic: user.profilePic,
      jobseekerProfilePic: user.jobseeker?.profilepic,
    });

    const response = {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic || null,
        jobseeker: user.jobseeker
          ? {
              profilepic: user.jobseeker.profilepic || null,
              // Add other jobseeker fields as needed
            }
          : null,
      },
    };

    console.log("Response being sent:", response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const getLikedTalents = async (req, res) => {
  try {
    // Get token from headers
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Verify token and get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).populate("liked");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return array of liked talent IDs
    const likedTalentIds = user.liked.map((talent) => talent._id);
    res.status(200).json(likedTalentIds);
  } catch (error) {
    console.error("Error in getLikedTalents:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleLikeTalent = async (req, res) => {
  try {
    // Get token from headers
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Verify token and get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { talentId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const talent = await JobSeeker.findById(talentId);
    if (!talent) {
      return res.status(404).json({ error: "Talent not found" });
    }

    // Initialize likes and liked array if they don't exist
    talent.likes = talent.likes || 0;
    user.liked = user.liked || [];

    // Check if talent is already liked
    const talentIdStr = talentId.toString();
    const isLiked = user.liked.some((id) => id.toString() === talentIdStr);

    if (isLiked) {
      // Unlike: Remove from liked array and decrease likes count
      user.liked = user.liked.filter((id) => id.toString() !== talentIdStr);
      talent.likes = Math.max(0, talent.likes - 1); // Prevent negative likes
    } else {
      // Like: Add to liked array and increase likes count
      user.liked.push(talentId);
      talent.likes += 1;
    }

    // Save both documents
    await Promise.all([user.save(), talent.save()]);

    res.status(200).json({
      likesCount: talent.likes,
      isLiked: !isLiked,
      message: isLiked ? "Successfully unliked" : "Successfully liked",
    });
  } catch (error) {
    // console.error("Error in handleLikeTalent:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export {
  loginController,
  signupController,
  getUserProfile,
  getLikedTalents,
  handleLikeTalent,
};
