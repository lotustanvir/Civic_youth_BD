import prisma from "../config/database.js";
import { getPagination, buildMeta } from "../utils/pagination.js";

export async function createPartnership(req, res, next) {
  try {
    const { organizationName, contactPerson, email, phone, organizationType, website, partnershipInterest, message, consent } = req.validatedBody;

    const inquiry = await prisma.partnershipInquiry.create({
      data: {
        organizationName,
        contactPerson,
        email,
        phone: phone || null,
        organizationType: organizationType || null,
        website: website || null,
        partnershipInterest,
        message,
        consent,
      },
    });

    return res.status(201).json({
      success: true,
      data: {
        id: inquiry.id,
        message: "Thank you for your partnership inquiry. Our team will review your request and get back to you shortly.",
      },
    });
  } catch (err) {
    console.error("Partnership inquiry error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Failed to process your inquiry. Please try again later." },
    });
  }
}

export async function getPartnerships(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const [inquiries, total] = await Promise.all([
      prisma.partnershipInquiry.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.partnershipInquiry.count(),
    ]);

    return res.json({
      success: true,
      data: inquiries,
      meta: buildMeta(page, limit, total),
    });
  } catch (err) {
    next(err);
  }
}
