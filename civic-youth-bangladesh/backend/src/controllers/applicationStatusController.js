import prisma from "../config/database.js";

const BG_MOBILE_PREFIXES = ["013", "017", "018", "019", "014", "015", "016"];

function normalizeToCanonicalPhone(phone) {
  if (!phone || typeof phone !== "string") {
    return null;
  }
  const digits = phone.replace(/\D/g, "");
  let candidate = digits;
  if (candidate.startsWith("880") && candidate.length === 13) {
    candidate = "0" + candidate.substring(3);
  }
  if (candidate.length === 11 && candidate.startsWith("0") && BG_MOBILE_PREFIXES.includes(candidate.substring(0, 3))) {
    return candidate;
  }
  return null;
}

const typeLabels = {
  membership: "Membership",
  volunteer: "Volunteer",
  partnership: "Partnership",
};

const modelMap = {
  membership: prisma.membershipApplication,
  volunteer: prisma.volunteerApplication,
  partnership: prisma.partnershipInquiry,
};

export async function checkApplicationStatus(req, res) {
  try {
    const { type, email, phone } = req.validatedBody;
    const model = modelMap[type];
    const normalizedSubmittedPhone = normalizeToCanonicalPhone(phone);

    if (!normalizedSubmittedPhone) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "No matching application was found. Please check your information and try again.",
        },
      });
    }

    const records = await model.findMany({
      where: {
        email: { equals: email, mode: "insensitive" },
      },
      select: {
        phone: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const match = records.find((r) => {
      const normalizedStoredPhone = normalizeToCanonicalPhone(r.phone);
      return normalizedStoredPhone !== null && normalizedStoredPhone === normalizedSubmittedPhone;
    });

    if (!match) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "No matching application was found. Please check your information and try again.",
        },
      });
    }

    return res.json({
      success: true,
      data: {
        type: typeLabels[type],
        status: match.status,
        submittedAt: match.createdAt.toISOString(),
      },
    });
  } catch (err) {
    console.error("Application status check error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Failed to check application status. Please try again later." },
    });
  }
}
