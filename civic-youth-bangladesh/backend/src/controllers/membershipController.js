import prisma from "../config/database.js";
import { getPagination, buildMeta } from "../utils/pagination.js";

export async function createMembership(req, res, next) {
  try {
    const { fullName, email, phone, institution, department, memberType, district, interests, motivation, consent } = req.validatedBody;

    const application = await prisma.membershipApplication.create({
      data: {
        fullName,
        email,
        phone,
        institution,
        department: department || null,
        memberType,
        district: district || null,
        interests: interests || null,
        motivation,
        consent,
      },
    });

    return res.status(201).json({
      success: true,
      data: {
        id: application.id,
        message: "Thank you for applying to join CYB. Your membership application has been received.",
      },
    });
  } catch (err) {
    console.error("Membership application error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Failed to process your application. Please try again later." },
    });
  }
}

export async function getMemberships(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const [applications, total] = await Promise.all([
      prisma.membershipApplication.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.membershipApplication.count(),
    ]);

    return res.json({
      success: true,
      data: applications,
      meta: buildMeta(page, limit, total),
    });
  } catch (err) {
    next(err);
  }
}
