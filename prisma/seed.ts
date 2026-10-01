import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { forumCategories } from "../content/forum";
import { PrismaClient } from "../generated/prisma/client";

/**
 * Seeds the forum's post categories. Idempotent: categories that already exist
 * (matched by name) are left untouched, so it is safe to run again.
 *
 * Run with `pnpm db:seed` (also run by `prisma migrate reset`).
 */
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function seedPostCategories() {
  for (const { name } of forumCategories) {
    const existing = await prisma.postCategory.findFirst({ where: { name } });
    if (existing) {
      console.log(`  · ${name} (already exists)`);
      continue;
    }
    await prisma.postCategory.create({ data: { name } });
    console.log(`  + ${name}`);
  }
}

async function main() {
  console.log("Seeding post categories…");
  await seedPostCategories();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
