import { Router } from "express";
import { requireAdmin, requireAdminAsync } from "../middleware/auth.js";
import { requireOrigin } from "../middleware/csrf.js";
import { adminLoginLimiter } from "../middleware/rateLimiter.js";
import {
  login,
  logout,
  me,
  getStats,
  getMemberships,
  getMembershipById,
  updateMembershipStatus,
  getVolunteers,
  getVolunteerById,
  updateVolunteerStatus,
  getPartnerships,
  getPartnershipById,
  updatePartnershipStatus,
  getContacts,
  getContactById,
  markContactRead,
} from "../controllers/adminController.js";

const router = Router();

router.post("/login", adminLoginLimiter, login);
router.post("/logout", requireAdmin, requireOrigin, logout);
router.get("/me", requireAdminAsync, me);

router.get("/stats", requireAdminAsync, getStats);

router.get("/memberships", requireAdminAsync, getMemberships);
router.get("/memberships/:id", requireAdminAsync, getMembershipById);
router.patch("/memberships/:id/status", requireAdminAsync, requireOrigin, updateMembershipStatus);

router.get("/volunteers", requireAdminAsync, getVolunteers);
router.get("/volunteers/:id", requireAdminAsync, getVolunteerById);
router.patch("/volunteers/:id/status", requireAdminAsync, requireOrigin, updateVolunteerStatus);

router.get("/partnerships", requireAdminAsync, getPartnerships);
router.get("/partnerships/:id", requireAdminAsync, getPartnershipById);
router.patch("/partnerships/:id/status", requireAdminAsync, requireOrigin, updatePartnershipStatus);

router.get("/contacts", requireAdminAsync, getContacts);
router.get("/contacts/:id", requireAdminAsync, getContactById);
router.patch("/contacts/:id/read", requireAdminAsync, requireOrigin, markContactRead);

export default router;
