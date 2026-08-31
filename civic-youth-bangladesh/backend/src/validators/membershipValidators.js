import { z } from "zod";

const membershipSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or less")
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
    .min(1, "Phone number is required")
    .max(20, "Phone number must be 20 characters or less")
    .regex(/^[\+]?[\d\s\-\(\)]{7,20}$/, "Invalid phone number format")
    .trim(),
  institution: z
    .string()
    .min(1, "Institution is required")
    .max(200, "Institution must be 200 characters or less")
    .trim(),
  department: z
    .string()
    .max(200, "Department must be 200 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  memberType: z.enum(["STUDENT", "PROFESSIONAL"], {
    errorMap: () => ({ message: "Member type must be Student or Professional" }),
  }),
  district: z
    .string()
    .max(100, "District must be 100 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  interests: z
    .string()
    .max(500, "Interests must be 500 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  motivation: z
    .string()
    .min(1, "Motivation is required")
    .max(2000, "Motivation must be 2000 characters or less")
    .trim(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

export function validateMembership(req, res, next) {
  const result = membershipSchema.safeParse(req.body);
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
