import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // encrypt the password
  const password = await bcrypt.hash("password", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@abc.com" },
    update: {},
    create: {
      email: "admin@abc.com",
      password: password,
      role: "ADMIN",
      name: "Admin User",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
