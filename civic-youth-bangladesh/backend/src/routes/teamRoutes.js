import { Router } from "express";
import { getTeamMembers } from "../controllers/teamController.js";

const router = Router();

router.get("/", getTeamMembers);

export default router;
