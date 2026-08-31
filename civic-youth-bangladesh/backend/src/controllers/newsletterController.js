import prisma from "../config/database.js";
import { getPagination, buildMeta } from "../utils/pagination.js";

export async function subscribe(req, res, next) {
  try {
    const { email } = req.validatedBody;

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.active) {
        return res.status(200).json({
          success: true,
          data: { message: "You are already subscribed to our newsletter." },
        });
      }
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { active: true },
      });
      return res.status(200).json({
        success: true,
        data: { message: "Your subscription has been reactivated. Welcome back!" },
      });
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email },
    });

    return res.status(201).json({
      success: true,
      data: { message: "Thank you for subscribing to our newsletter!" },
    });
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return res.status(500).json({
      success: false,
      error: { code: 500, message: "Failed to process your subscription. Please try again later." },
    });
  }
}

export async function getSubscribers(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.newsletterSubscriber.count(),
    ]);

    return res.json({
      success: true,
      data: subscribers,
      meta: buildMeta(page, limit, total),
    });
  } catch (err) {
    next(err);
  }
}
