import prisma from "../config/database.js";

export async function getCategories(req, res, next) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { nameEn: "asc" },
    });
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
}
