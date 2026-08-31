import { Router } from "express";
import { checkApplicationStatus } from "../controllers/applicationStatusController.js";
import { validateApplicationStatus } from "../validators/applicationStatusValidator.js";
import { statusCheckLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", statusCheckLimiter, validateApplicationStatus, checkApplicationStatus);

export default router;
