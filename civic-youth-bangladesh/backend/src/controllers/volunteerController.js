import prisma from "../config/database.js";
import { getPagination, buildMeta } from "../utils/pagination.js";

export async function createVolunteer(req, res, next) {
  try {
    const { fullName, email, phone, institution, skills, interests, experience, availability, motivation, portfolioUrl, consent } = req.validatedBody;

    const application = await prisma.volunteerApplication.create({
      data: {
        fullName,
        email,
        phone,
        institution: institution || null,
        skills: skills || null,
        interests: interests || null,
        experience: experience || null,
        availability: availability || null,
        motivation,
        portfolioUrl: portfolioUrl || null,
        consent,
      },
    });

    return res.status(201).json({
      success: true,
      data: {
        id: application.id,
        message: "Thank you for volunteering with CYB. Your application has been received and our team will review it.",
      },
    });
  } catch (err) {
    console.error("Volunteer application error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Failed to process your application. Please try again later." },
    });
  }
}

export async function getVolunteers(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const [applications, total] = await Promise.all([
      prisma.volunteerApplication.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.volunteerApplication.count(),
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
