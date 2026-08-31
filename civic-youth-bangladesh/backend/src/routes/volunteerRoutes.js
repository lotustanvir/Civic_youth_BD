import { Router } from "express";
import { createVolunteer } from "../controllers/volunteerController.js";
import { validateVolunteer } from "../validators/volunteerValidators.js";
import { strictLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", strictLimiter, validateVolunteer, createVolunteer);

export default router;
