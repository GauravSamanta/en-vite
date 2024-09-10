import { Router } from "express";
import { getUser, loginUser, registerUser } from "../controllers/user.controllers.js";
const router = Router();

router.get("/", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
