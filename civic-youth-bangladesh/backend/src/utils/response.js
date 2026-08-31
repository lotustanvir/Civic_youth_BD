export function sendSuccess(res, data, statusCode = 200, meta = null) {
  const response = { success: true, data };
  if (meta) response.meta = meta;
  return res.status(statusCode).json(response);
}

export function sendError(res, statusCode, message, details = null) {
  const response = { success: false, error: { code: statusCode, message } };
  if (details) response.error.details = details;
  return res.status(statusCode).json(response);
}
