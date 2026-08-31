import { z } from "zod";

const applicationStatusSchema = z.object({
  type: z.enum(["membership", "volunteer", "partnership"], {
    errorMap: () => ({ message: "Type must be membership, volunteer, or partnership" }),
  }),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255)
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(30)
    .trim(),
});

export function validateApplicationStatus(req, res, next) {
  const result = applicationStatusSchema.safeParse(req.body);
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
