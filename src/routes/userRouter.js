import { Router } from "express";

import { getUser, rankUsers } from "../controllers/userController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const router = Router();

router.get("/users/me", validateToken, getUser);
router.get("/ranking", rankUsers);

export default router;