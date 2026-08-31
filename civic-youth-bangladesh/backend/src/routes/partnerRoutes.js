import { Router } from "express";
import { getPartners } from "../controllers/partnerController.js";

const router = Router();

router.get("/", getPartners);

export default router;
