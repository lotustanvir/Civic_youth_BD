import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@civicyouthbd.org";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const name = process.env.ADMIN_NAME || "CYB Admin";
  const resetPassword = process.argv.includes("--reset-password");

  if (!process.env.ADMIN_PASSWORD) {
    console.warn("WARNING: Using default admin password. Set ADMIN_PASSWORD in .env for production.");
  }

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, role: true },
  });

  if (existing && !resetPassword) {
    console.log(`Admin user already exists: ${existing.email} (${existing.role}). Skipping.`);
    console.log("To reset password, run: node prisma/seedAdmin.js --reset-password");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: { passwordHash },
    });
    console.log(`Admin password updated: ${existing.email}`);
  } else {
    await prisma.user.create({
      data: { name, email, passwordHash, role: "ADMIN" },
    });
    console.log(`Admin user created: ${email}`);
  }
}

main()
  .catch((e) => {
    console.error("Admin seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
