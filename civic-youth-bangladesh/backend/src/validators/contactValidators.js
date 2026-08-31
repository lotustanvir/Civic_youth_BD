import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be 255 characters or less")
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be 200 characters or less")
    .trim(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message must be 5000 characters or less")
    .trim(),
});

export function validateContact(req, res, next) {
  const result = contactSchema.safeParse(req.body);
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
