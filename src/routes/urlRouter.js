import { Router } from "express";

import { getUrl, openUrl, shortenUrl } from "../controllers/urlController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validateUrl } from "../middlewares/urlMiddleware.js";

const router = Router();

router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl", openUrl);
router.post("/urls/shorten", validateToken, validateUrl, shortenUrl);

export default router;