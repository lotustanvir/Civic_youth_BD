import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/database.js";
import env from "../config/env.js";
import { getPagination, buildMeta } from "../utils/pagination.js";

function getCookieOptions() {
  const isProd = env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  };
}

function getClearCookieOptions() {
  const isProd = env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  };
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Email and password are required" },
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || user.role !== "ADMIN") {
      return res.status(401).json({
        success: false,
        error: { code: 401, message: "Invalid email or password" },
      });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: { code: 401, message: "Invalid email or password" },
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie(env.COOKIE_NAME, token, getCookieOptions());

    return res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function logout(req, res) {
  res.clearCookie(env.COOKIE_NAME, getClearCookieOptions());

  return res.json({ success: true, data: { message: "Logged out successfully" } });
}

export async function me(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.admin.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 401, message: "User not found" },
      });
    }

    return res.json({ success: true, data: user });
  } catch (err) {
    console.error("Admin me error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function getStats(req, res) {
  try {
    const [memberships, volunteers, partnerships, contacts] = await Promise.all([
      prisma.membershipApplication.count(),
      prisma.volunteerApplication.count(),
      prisma.partnershipInquiry.count(),
      prisma.contactSubmission.count(),
    ]);

    const [pendingMemberships, pendingVolunteers, pendingPartnerships] =
      await Promise.all([
        prisma.membershipApplication.count({ where: { status: "PENDING" } }),
        prisma.volunteerApplication.count({ where: { status: "PENDING" } }),
        prisma.partnershipInquiry.count({ where: { status: "PENDING" } }),
      ]);

    return res.json({
      success: true,
      data: {
        total: { memberships, volunteers, partnerships, contacts },
        pending: {
          memberships: pendingMemberships,
          volunteers: pendingVolunteers,
          partnerships: pendingPartnerships,
        },
      },
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function getMemberships(req, res) {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const [applications, total] = await Promise.all([
      prisma.membershipApplication.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          institution: true,
          department: true,
          memberType: true,
          district: true,
          interests: true,
          motivation: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.membershipApplication.count(),
    ]);

    return res.json({
      success: true,
      data: applications,
      meta: buildMeta(page, limit, total),
    });
  } catch (err) {
    console.error("Admin getMemberships error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function getMembershipById(req, res) {
  try {
    const { id } = req.params;
    const application = await prisma.membershipApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        error: { code: 404, message: "Application not found" },
      });
    }

    return res.json({ success: true, data: application });
  } catch (err) {
    console.error("Admin getMembershipById error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function updateMembershipStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Invalid status value" },
      });
    }

    const application = await prisma.membershipApplication.update({
      where: { id },
      data: { status },
    });

    return res.json({ success: true, data: application });
  } catch (err) {
    console.error("Admin updateMembershipStatus error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function getVolunteers(req, res) {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const [applications, total] = await Promise.all([
      prisma.volunteerApplication.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          institution: true,
          skills: true,
          interests: true,
          experience: true,
          availability: true,
          motivation: true,
          portfolioUrl: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.volunteerApplication.count(),
    ]);

    return res.json({
      success: true,
      data: applications,
      meta: buildMeta(page, limit, total),
    });
  } catch (err) {
    console.error("Admin getVolunteers error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function getVolunteerById(req, res) {
  try {
    const { id } = req.params;
    const application = await prisma.volunteerApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        error: { code: 404, message: "Application not found" },
      });
    }

    return res.json({ success: true, data: application });
  } catch (err) {
    console.error("Admin getVolunteerById error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function updateVolunteerStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Invalid status value" },
      });
    }

    const application = await prisma.volunteerApplication.update({
      where: { id },
      data: { status },
    });

    return res.json({ success: true, data: application });
  } catch (err) {
    console.error("Admin updateVolunteerStatus error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function getPartnerships(req, res) {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const [inquiries, total] = await Promise.all([
      prisma.partnershipInquiry.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          organizationName: true,
          contactPerson: true,
          email: true,
          phone: true,
          organizationType: true,
          website: true,
          partnershipInterest: true,
          message: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.partnershipInquiry.count(),
    ]);

    return res.json({
      success: true,
      data: inquiries,
      meta: buildMeta(page, limit, total),
    });
  } catch (err) {
    console.error("Admin getPartnerships error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function getPartnershipById(req, res) {
  try {
    const { id } = req.params;
    const inquiry = await prisma.partnershipInquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        error: { code: 404, message: "Inquiry not found" },
      });
    }

    return res.json({ success: true, data: inquiry });
  } catch (err) {
    console.error("Admin getPartnershipById error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function updatePartnershipStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Invalid status value" },
      });
    }

    const inquiry = await prisma.partnershipInquiry.update({
      where: { id },
      data: { status },
    });

    return res.json({ success: true, data: inquiry });
  } catch (err) {
    console.error("Admin updatePartnershipStatus error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function getContacts(req, res) {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const [contacts, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          message: true,
          read: true,
          createdAt: true,
        },
      }),
      prisma.contactSubmission.count(),
    ]);

    return res.json({
      success: true,
      data: contacts,
      meta: buildMeta(page, limit, total),
    });
  } catch (err) {
    console.error("Admin getContacts error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function getContactById(req, res) {
  try {
    const { id } = req.params;
    const contact = await prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: { code: 404, message: "Contact not found" },
      });
    }

    return res.json({ success: true, data: contact });
  } catch (err) {
    console.error("Admin getContactById error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}

export async function markContactRead(req, res) {
  try {
    const { id } = req.params;
    const contact = await prisma.contactSubmission.update({
      where: { id },
      data: { read: true },
    });

    return res.json({ success: true, data: contact });
  } catch (err) {
    console.error("Admin markContactRead error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Internal server error" },
    });
  }
}
