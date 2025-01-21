import { Router } from "express";
import {
  RegisterController,
  GetTalentsController,
} from "../Controllers/registercontrollers/RegisterController.js";
import upload from "../Config/multer.js";

const router = new Router();

// Talent registration and fetching talents routes
router.post("/register-talent", upload.single("profilephoto"), RegisterController);
router.route("/get-talents").get(GetTalentsController);

export default router;
