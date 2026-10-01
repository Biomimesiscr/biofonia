import "server-only";

import { PostCategoryService } from "@/application/postCategory/services/implementations/PostCategoryService";
import { PrismaPostCategoryRepository } from "@/infrastructure/postCategory/repositories/PrismaPostCategoryRepository";
import PostCategoryController from "@/presentation/postCategory/controllers/postCategory.controller";

/**
 * Composition root: the only module that knows concrete implementations.
 * Wire repositories → services → controllers here; everything else depends
 * on interfaces. Route handlers, Server Components and Server Actions import
 * services/controllers from this file — never Prisma or repositories directly.
 */

// ---------------------------- Repositories ----------------------------
const postCategoryRepository = new PrismaPostCategoryRepository();

// ------------------------------ Services -------------------------------
export const postCategoryService = new PostCategoryService(postCategoryRepository);

// ----------------------------- Controllers -----------------------------
export const postCategoryController = new PostCategoryController(postCategoryService);
