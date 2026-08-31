import prisma from "../config/database.js";

export async function getImpactMetrics(req, res, next) {
  try {
    const metrics = await prisma.impactMetric.findMany({
      where: { published: true },
      orderBy: { createdAt: "asc" },
    });

    const current = metrics.filter((m) => m.type === "CURRENT");
    const target = metrics.filter((m) => m.type === "TARGET");

    res.json({ success: true, data: { current, target } });
  } catch (err) {
    next(err);
  }
}
