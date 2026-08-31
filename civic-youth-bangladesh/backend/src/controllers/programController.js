import prisma from "../config/database.js";
import { getPagination, buildMeta } from "../utils/pagination.js";

export async function getPrograms(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [programs, total] = await Promise.all([
      prisma.program.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.program.count({ where: { published: true } }),
    ]);
    res.json({ success: true, data: programs, meta: buildMeta(page, limit, total) });
  } catch (err) {
    next(err);
  }
}

export async function getFeaturedProgram(req, res, next) {
  try {
    const program = await prisma.program.findFirst({
      where: { published: true, featured: true },
    });
    if (!program) {
      return res.json({ success: true, data: null });
    }
    res.json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
}

export async function getProgramBySlug(req, res, next) {
  try {
    const program = await prisma.program.findFirst({
      where: { slug: req.params.slug, published: true },
    });
    if (!program) {
      return res.status(404).json({ success: false, error: { code: 404, message: "Program not found" } });
    }
    res.json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
}
