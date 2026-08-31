import { Router } from "express";
import { getThemes, getThemeBySlug } from "../controllers/thematicAreaController.js";

const router = Router();

router.get("/", getThemes);
router.get("/:slug", getThemeBySlug);

export default router;
