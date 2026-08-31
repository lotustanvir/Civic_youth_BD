import env from "../config/env.js";

export function requireOrigin(req, res, next) {
  const origin = req.headers.origin;

  if (!origin) {
    return res.status(403).json({
      success: false,
      error: { code: 403, message: "Forbidden: missing origin" },
    });
  }

  if (origin !== env.FRONTEND_URL) {
    return res.status(403).json({
      success: false,
      error: { code: 403, message: "Forbidden: invalid origin" },
    });
  }

  next();
}
