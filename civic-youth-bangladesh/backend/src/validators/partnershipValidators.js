import { z } from "zod";

const partnershipSchema = z.object({
  organizationName: z
    .string()
    .min(1, "Organization name is required")
    .max(200, "Organization name must be 200 characters or less")
    .trim(),
  contactPerson: z
    .string()
    .min(1, "Contact person is required")
    .max(100, "Contact person must be 100 characters or less")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be 255 characters or less")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .max(20, "Phone number must be 20 characters or less")
    .regex(/^[\+]?[\d\s\-\(\)]{7,20}$/, "Invalid phone number format")
    .trim()
    .optional()
    .or(z.literal("")),
  organizationType: z
    .string()
    .max(200, "Organization type must be 200 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Invalid URL format")
    .max(500, "URL must be 500 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  partnershipInterest: z
    .string()
    .min(1, "Partnership interest is required")
    .max(1000, "Partnership interest must be 1000 characters or less")
    .trim(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(3000, "Message must be 3000 characters or less")
    .trim(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

export function validatePartnership(req, res, next) {
  const result = partnershipSchema.safeParse(req.body);
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
