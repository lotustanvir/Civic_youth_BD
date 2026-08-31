import prisma from "../config/database.js";
import { getPagination, buildMeta } from "../utils/pagination.js";

export async function getArticles(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { category } = req.query;

    const where = { published: true };
    if (category) where.category = { slug: category };

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: { category: true, author: { select: { id: true, name: true } } },
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);
    res.json({ success: true, data: articles, meta: buildMeta(page, limit, total) });
  } catch (err) {
    next(err);
  }
}

export async function getArticleBySlug(req, res, next) {
  try {
    const article = await prisma.article.findFirst({
      where: { slug: req.params.slug, published: true },
      include: { category: true, author: { select: { id: true, name: true } } },
    });
    if (!article) {
      return res.status(404).json({ success: false, error: { code: 404, message: "Article not found" } });
    }
    res.json({ success: true, data: article });
  } catch (err) {
    next(err);
  }
}
