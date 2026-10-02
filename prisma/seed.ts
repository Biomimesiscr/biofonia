import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { forumCategories } from "../content/forum";
import { postReportReasons } from "../content/post-detail";
import { PrismaClient } from "../generated/prisma/client";

/**
 * Seeds the forum's post categories and report reasons. Idempotent: rows that
 * already exist (matched by name) are left untouched, so it is safe to run again.
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

async function seedPostReportReasons() {
  for (const reason of postReportReasons) {
    const existing = await prisma.postReportReason.findFirst({ where: { reason } });
    if (existing) {
      console.log(`  · ${reason} (already exists)`);
      continue;
    }
    await prisma.postReportReason.create({ data: { reason } });
    console.log(`  + ${reason}`);
  }
}

async function main() {
  console.log("Seeding post categories…");
  await seedPostCategories();
  console.log("Seeding post report reasons…");
  await seedPostReportReasons();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
