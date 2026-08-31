import { Router } from "express";
import { getOpportunities, getOpportunityBySlug } from "../controllers/opportunityController.js";

const router = Router();

router.get("/", getOpportunities);
router.get("/:slug", getOpportunityBySlug);

export default router;
