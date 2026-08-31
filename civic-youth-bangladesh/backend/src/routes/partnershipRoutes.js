import { Router } from "express";
import { createPartnership } from "../controllers/partnershipController.js";
import { validatePartnership } from "../validators/partnershipValidators.js";
import { strictLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", strictLimiter, validatePartnership, createPartnership);

export default router;
