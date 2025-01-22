import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../Models/UserModel.js"; 

const generateToken = (userId,role,username,email) => {
  return jwt.sign({ userId ,role,username,email}, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

 const signupController = async (req, res) => {
  try {

    const { username, email, password,phoneno } = req.body;

    if(!username||!email || !password || !phoneno ){
        return res.status(400).json({ error: "fill all details" });
    }
    const phoneRegex = /^[6-9]\d{9}$/; 
if (!phoneRegex.test(phoneno)) {
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
      phoneno
    });

    await newUser.save();

    const token = generateToken(newUser._id,newUser.role,newUser.username,user.email);

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

    if(!email || !password ){
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

    const token = generateToken(user._id,user.role,user.username,user.email);

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

export {loginController,signupController}