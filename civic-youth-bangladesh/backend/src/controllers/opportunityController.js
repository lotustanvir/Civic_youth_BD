import prisma from "../config/database.js";
import { getPagination, buildMeta } from "../utils/pagination.js";

export async function getOpportunities(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [opportunities, total] = await Promise.all([
      prisma.opportunity.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.opportunity.count({ where: { published: true } }),
    ]);
    res.json({ success: true, data: opportunities, meta: buildMeta(page, limit, total) });
  } catch (err) {
    next(err);
  }
}

export async function getOpportunityBySlug(req, res, next) {
  try {
    const opportunity = await prisma.opportunity.findFirst({
      where: { slug: req.params.slug, published: true },
    });
    if (!opportunity) {
      return res.status(404).json({ success: false, error: { code: 404, message: "Opportunity not found" } });
    }
    res.json({ success: true, data: opportunity });
  } catch (err) {
    next(err);
  }
}
