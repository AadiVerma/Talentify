import User from "../../Models/UserModel.js";
import JobSeeker from "../../Models/JobSeeker.js";

const RegisterController = async (req, res) => {
  const { firstname, lastname, description, email, skills, experience } =
    req.body;
  console.log(req.body);
  try {
    const finduser = await User.findOne({ email: email });
    // if (!finduser) {
    //   return res.status(400).json({ message: "User not found" });
    // }
    const newJobSeeker = new JobSeeker({
      firstname,
      lastname,
      description,
      email,
      skills,
      experience,
      //   User: finduser._id,
    });

    await newJobSeeker.save();
    finduser.jobseeker = newJobSeeker._id;
    await finduser.save();

    res.status(201).json({ message: "Job Seeker added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save job seeker", error: error.message });
  }
};

const GetTalentsController = async (req, res) => {
  try {
    console.log("cffefedede")
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
    res
      .status(500)
      .json({ message: "Failed to fetch not approved talents", error: error.message });
  }
};

const UpdateJobSeekerApproval = async (req, res) => {
  console.log(req.body)
  const { id,approve } = req.body;
  console.log("id",id);

  try {
    const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(
      id,
      { approve: approve },
    );

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


export { RegisterController, GetTalentsController,GetTalentsNotApproved,UpdateJobSeekerApproval };
