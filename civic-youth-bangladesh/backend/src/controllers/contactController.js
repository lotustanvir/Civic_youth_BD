import prisma from "../config/database.js";
import { getPagination, buildMeta } from "../utils/pagination.js";

export async function createContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.validatedBody;

    const submission = await prisma.contactSubmission.create({
      data: { name, email, subject, message },
    });

    return res.status(201).json({
      success: true,
      data: {
        id: submission.id,
        message: "Your submission has been received. We will get back to you shortly.",
      },
    });
  } catch (err) {
    console.error("Contact submission error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Failed to process your submission. Please try again later." },
    });
  }
}

export async function getContacts(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const [contacts, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactSubmission.count(),
    ]);

    return res.json({
      success: true,
      data: contacts,
      meta: buildMeta(page, limit, total),
    });
  } catch (err) {
    next(err);
  }
}
