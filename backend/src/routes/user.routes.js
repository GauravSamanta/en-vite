import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", verifyUser, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
