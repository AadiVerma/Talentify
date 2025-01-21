import { Router } from "express";
import {RegisterController,GetTalentsController, GetTalentsNotApproved, UpdateJobSeekerApproval} from "../Controllers/registercontrollers/RegisterController.js"; 
import { getCountsData } from "../Controllers/AdminController.js/AdminController.js";
import { loginController, signupController } from "../Controllers/UserController/userController.js";
const router = new Router();

// Talent registration and fetching talents routes
router.route("/register-talent").post(RegisterController);
router.route("/get-talents").get(GetTalentsController);
router.route("/get-non-talents").get(GetTalentsNotApproved);

router.route("/update-talent").post(UpdateJobSeekerApproval)
router.route("/signup").post(signupController)
router.route("/login").post(loginController)





// Endpoint to get all counts
router.get('/status-counts', getCountsData);

export default router;
