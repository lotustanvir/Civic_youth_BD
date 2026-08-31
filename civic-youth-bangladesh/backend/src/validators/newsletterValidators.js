import { z } from "zod";

const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be 255 characters or less")
    .trim()
    .toLowerCase(),
});

export function validateSubscribe(req, res, next) {
  const result = subscribeSchema.safeParse(req.body);
  if (!result.success) {
    const details = result.error.flatten().fieldErrors;
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "Validation failed", details },
    });
  }
  req.validatedBody = result.data;
  next();
}
