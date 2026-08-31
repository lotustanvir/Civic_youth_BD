import { Router } from "express";
import { subscribe } from "../controllers/newsletterController.js";
import { validateSubscribe } from "../validators/newsletterValidators.js";
import { strictLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/subscribe", strictLimiter, validateSubscribe, subscribe);

export default router;
