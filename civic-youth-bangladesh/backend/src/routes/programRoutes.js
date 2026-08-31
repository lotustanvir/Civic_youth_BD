import { Router } from "express";
import { getPrograms, getFeaturedProgram, getProgramBySlug } from "../controllers/programController.js";

const router = Router();

router.get("/", getPrograms);
router.get("/featured", getFeaturedProgram);
router.get("/:slug", getProgramBySlug);

export default router;
