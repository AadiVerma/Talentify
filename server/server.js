import express from "express";
import cors from "cors";
import connectDB from "./Config/db.js";
import Routes from "./Routes/Routes.js";
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });


app.use("/api/v1",Routes);




// app.post("/api/talent", upload.single("photo"), async (req, res) => {
//   const { firstname, lastname,email, description, skills,experience} = req.body;
//   // const photo = req.file ? req.file.path : null;

//   try {
//     const finduser = await SignUp.findOne({ email: email });
//     if(!finduser){
//       res.status(400).json({ message: "User not found" });
//     } else {
//       const newJobSeeker = new JobSeeker({
//         firstname,
//         lastname,
//         email,
//         description,
//         skills,
//         experience,
//         User: finduser._id,
//       });
//       await newJobSeeker.save();
//       finduser.jobseeker = newJobSeeker._id;
//       await finduser.save();
//       res.status(201).json({ message: "Job Seeker added successfully" });
//     }
//   }catch (error) {
//     res.status(500).json({ message: "Failed to save job seeker", error: error.message });
//   }
// });
  //   const newTalent = new SignUp({
  //     username,
  //     email,
  //     password,
  //     phoneno,
  //     profilephoto,
  //     role,
  //     // jobseeker,
  //     status
  //   });

  //   await newTalent.save();
  //   res.status(201).json({ message: "Talent added successfully" });
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json({ message: "Failed to save talent", error: error.message });
  // }

// GET endpoint to fetch all talents
// app.get("/api/talents", async (req, res) => {
//   try {
//     const talents = await Talent.find();
//     res.status(200).json(talents);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch talents", error: error.message });
//   }
// });


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
