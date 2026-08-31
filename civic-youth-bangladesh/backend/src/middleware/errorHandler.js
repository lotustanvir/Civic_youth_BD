import { ApiError } from "../utils/ApiError.js";

export function errorHandler(err, req, res, _next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.statusCode,
        message: err.message,
        details: err.details,
      },
    });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    error: {
      code: 500,
      message: "Internal server error",
    },
  });
}
