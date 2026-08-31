import prisma from "../config/database.js";
import { getPagination, buildMeta } from "../utils/pagination.js";

export async function getThemes(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [themes, total] = await Promise.all([
      prisma.thematicArea.findMany({
        orderBy: { sortOrder: "asc" },
        skip,
        take: limit,
      }),
      prisma.thematicArea.count(),
    ]);
    res.json({ success: true, data: themes, meta: buildMeta(page, limit, total) });
  } catch (err) {
    next(err);
  }
}

export async function getThemeBySlug(req, res, next) {
  try {
    const theme = await prisma.thematicArea.findFirst({
      where: { slug: req.params.slug },
    });
    if (!theme) {
      return res.status(404).json({ success: false, error: { code: 404, message: "Thematic area not found" } });
    }
    res.json({ success: true, data: theme });
  } catch (err) {
    next(err);
  }
}
