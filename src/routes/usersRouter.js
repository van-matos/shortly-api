import { Router } from "express";

import { signIn, signUp } from "../controllers/usersController.js";
import { validateLogin, validateSignup } from "../middlewares/usersMiddleware.js";

const router = Router();

router.post("/signup", validateSignup, signUp);
router.post("/signin", validateLogin, signIn);

export default router;