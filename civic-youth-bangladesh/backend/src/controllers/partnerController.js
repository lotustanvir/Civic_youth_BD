import prisma from "../config/database.js";

export async function getPartners(req, res, next) {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { sortOrder: "asc" },
    });
    res.json({ success: true, data: partners });
  } catch (err) {
    next(err);
  }
}
