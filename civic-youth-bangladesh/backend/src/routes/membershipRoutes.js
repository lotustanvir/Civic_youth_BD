import { Router } from "express";
import { createMembership } from "../controllers/membershipController.js";
import { validateMembership } from "../validators/membershipValidators.js";
import { strictLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", strictLimiter, validateMembership, createMembership);

export default router;
