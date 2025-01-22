import { Router } from "express";
import {
  RegisterController,
  GetTalentsController, GetTalentsNotApproved, UpdateJobSeekerApproval,
} from "../Controllers/registercontrollers/RegisterController.js";
import  SendMails from "../Controllers/mailcontroller/MailController.js";
import upload from "../Config/multer.js";
import { getCountsData } from "../Controllers/AdminController.js/AdminController.js";
import { loginController, signupController } from "../Controllers/UserController/userController.js";
const router = new Router();

// Talent registration and fetching talents routes
router.post("/register-talent", upload.single("profilephoto"), RegisterController);
router.route("/get-talents").get(GetTalentsController);
router.route("/get-non-talents").get(GetTalentsNotApproved);

router.route("/update-talent").post(UpdateJobSeekerApproval)
router.route("/signup").post(signupController)
router.route("/login").post(loginController)

router.route("/contact-us").post(SendMails);  



// Endpoint to get all counts
router.get('/status-counts', getCountsData);

export default router;
