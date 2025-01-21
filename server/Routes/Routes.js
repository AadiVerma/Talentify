import { Router } from "express";
import {RegisterController,GetTalentsController} from "../Controllers/registercontrollers/RegisterController.js"; 

const router = new Router();

// Talent registration and fetching talents routes
router.route("/register-talent").post(RegisterController);
router.route("/get-talents").get(GetTalentsController);


export default router;
