import { Router } from "express";

import { signUp } from "../controllers/usersController.js";
import { validateSignup } from "../middlewares/usersMiddleware.js";

const router = Router();

router.post("/signup", validateSignup, signUp);

export default router;