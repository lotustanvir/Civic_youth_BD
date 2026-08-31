import { Router } from "express";
import programRoutes from "./programRoutes.js";
import articleRoutes from "./articleRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import thematicAreaRoutes from "./thematicAreaRoutes.js";
import opportunityRoutes from "./opportunityRoutes.js";
import partnerRoutes from "./partnerRoutes.js";
import teamRoutes from "./teamRoutes.js";
import impactRoutes from "./impactRoutes.js";
import contactRoutes from "./contactRoutes.js";
import newsletterRoutes from "./newsletterRoutes.js";
import membershipRoutes from "./membershipRoutes.js";
import volunteerRoutes from "./volunteerRoutes.js";
import partnershipRoutes from "./partnershipRoutes.js";
import applicationStatusRoutes from "./applicationStatusRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    data: {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

router.use("/programs", programRoutes);
router.use("/articles", articleRoutes);
router.use("/categories", categoryRoutes);
router.use("/themes", thematicAreaRoutes);
router.use("/opportunities", opportunityRoutes);
router.use("/partners", partnerRoutes);
router.use("/team", teamRoutes);
router.use("/impact", impactRoutes);
router.use("/contact", contactRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/membership", membershipRoutes);
router.use("/volunteer", volunteerRoutes);
router.use("/partnership", partnershipRoutes);
router.use("/application-status", applicationStatusRoutes);
router.use("/admin", adminRoutes);

export default router;
