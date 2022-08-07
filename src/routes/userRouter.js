import { Router } from "express";

import { signIn, signUp } from "../controllers/userController.js";
import { validateLogin, validateSignup } from "../middlewares/userMiddleware.js";

const router = Router();

router.post("/signup", validateSignup, signUp);
router.post("/signin", validateLogin, signIn);

export default router;