import { Router } from "express";
import { getImpactMetrics } from "../controllers/impactController.js";

const router = Router();

router.get("/", getImpactMetrics);

export default router;
