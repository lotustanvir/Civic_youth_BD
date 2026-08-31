import prisma from "../config/database.js";

export async function getTeamMembers(req, res, next) {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { sortOrder: "asc" },
    });
    res.json({ success: true, data: team });
  } catch (err) {
    next(err);
  }
}
