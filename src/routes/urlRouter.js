import { Router } from "express";

import { deleteUrl, getUrl, openUrl, shortenUrl } from "../controllers/urlController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validateUrl, validateUrlUser } from "../middlewares/urlMiddleware.js";

const router = Router();

router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl", openUrl);
router.post("/urls/shorten", validateToken, validateUrl, shortenUrl);
router.delete("/urls/:id", validateToken, validateUrlUser, deleteUrl);

export default router;