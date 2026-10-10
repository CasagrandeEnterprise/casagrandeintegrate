import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { hashPassword } from "../src/lib/password";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME?.trim() || "Administrador";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set.");
}

if (!email || !password) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
}

if (password.length < 12 || password.length > 72) {
  throw new Error("ADMIN_PASSWORD must be between 12 and 72 characters.");
}

const adminEmail = email;
const adminPassword = password;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const passwordHash = await hashPassword(adminPassword);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name,
      passwordHash,
      failedLoginCount: 0,
      lockedUntil: null,
    },
    create: {
      email: adminEmail,
      name,
      passwordHash,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error instanceof Error ? error.message : "Seed failed.");
    await prisma.$disconnect();
    process.exit(1);
  });
