import { Router } from "express";
import { createContact } from "../controllers/contactController.js";
import { validateContact } from "../validators/contactValidators.js";
import { strictLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", strictLimiter, validateContact, createContact);

export default router;
