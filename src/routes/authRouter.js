import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";
import { validateLogin, validateSignup } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", validateSignup, signUp);
router.post("/signin", validateLogin, signIn);

export default router;