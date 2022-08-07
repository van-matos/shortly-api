import { Router } from "express";

import { getUser } from "../controllers/userController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const router = Router();

router.get("/users/me", validateToken, getUser);

export default router;