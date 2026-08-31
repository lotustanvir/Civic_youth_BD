import { z } from "zod";

const volunteerSchema = z.object({
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
    .max(200, "Institution must be 200 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  skills: z
    .string()
    .max(500, "Skills must be 500 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  interests: z
    .string()
    .max(500, "Interests must be 500 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  experience: z
    .string()
    .max(2000, "Experience must be 2000 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  availability: z
    .string()
    .max(200, "Availability must be 200 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  motivation: z
    .string()
    .min(1, "Motivation is required")
    .max(2000, "Motivation must be 2000 characters or less")
    .trim(),
  portfolioUrl: z
    .string()
    .url("Invalid URL format")
    .max(500, "URL must be 500 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

export function validateVolunteer(req, res, next) {
  const result = volunteerSchema.safeParse(req.body);
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
