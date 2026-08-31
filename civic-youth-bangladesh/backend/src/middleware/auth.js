import jwt from "jsonwebtoken";
import prisma from "../config/database.js";
import env from "../config/env.js";

export function requireAdmin(req, res, next) {
  const token = req.cookies[env.COOKIE_NAME];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: 401, message: "Authentication required" },
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (decoded.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        error: { code: 403, message: "Access denied" },
      });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: { code: 401, message: "Invalid or expired session" },
    });
  }
}

export async function requireAdminAsync(req, res, next) {
  const token = req.cookies[env.COOKIE_NAME];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: 401, message: "Authentication required" },
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (decoded.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        error: { code: 403, message: "Access denied" },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return res.status(401).json({
        success: false,
        error: { code: 401, message: "Account no longer authorized" },
      });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: { code: 401, message: "Invalid or expired session" },
    });
  }
}
