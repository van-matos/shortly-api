import { Router } from "express";

import { getUrl, shortenUrl } from "../controllers/urlController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validateUrl } from "../middlewares/urlMiddleware.js";

const router = Router();

router.get("/urls/:id", getUrl);
router.post("/urls/shorten", validateToken, validateUrl, shortenUrl);

export default router;