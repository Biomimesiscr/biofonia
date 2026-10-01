import "server-only";

import { AuthService } from "@/application/auth/services/implementations/AuthService";
import { PostCategoryService } from "@/application/postCategory/services/implementations/PostCategoryService";
import { UserService } from "@/application/user/services/implementations/UserService";
import { CryptoSessionTokenService } from "@/infrastructure/auth/CryptoSessionTokenService";
import {
  GoogleOAuthIdentityProvider,
  googleOAuthConfigFromEnv,
} from "@/infrastructure/auth/GoogleOAuthIdentityProvider";
import { ScryptPasswordHasher } from "@/infrastructure/auth/ScryptPasswordHasher";
import { PrismaPostCategoryRepository } from "@/infrastructure/postCategory/repositories/PrismaPostCategoryRepository";
import { PrismaSessionRepository } from "@/infrastructure/session/repositories/PrismaSessionRepository";
import { PrismaUserRepository } from "@/infrastructure/user/repositories/PrismaUserRepository";
import GoogleAuthController from "@/presentation/auth/controllers/googleAuth.controller";
import { createSessionHelpers } from "@/presentation/auth/session";
import PostCategoryController from "@/presentation/postCategory/controllers/postCategory.controller";

/**
 * Composition root: the only module that knows concrete implementations.
 * Wire repositories → services → controllers here; everything else depends
 * on interfaces. Route handlers, Server Components and Server Actions import
 * services/controllers from this file — never Prisma or repositories directly.
 */

// ---------------------------- Repositories ----------------------------
const postCategoryRepository = new PrismaPostCategoryRepository();
const userRepository = new PrismaUserRepository();
const sessionRepository = new PrismaSessionRepository();

// ------------------------ External services --------------------------
const passwordHasher = new ScryptPasswordHasher();
const sessionTokenService = new CryptoSessionTokenService();
// Env is read lazily so the app boots without Google credentials.
const googleIdentityProvider = new GoogleOAuthIdentityProvider(googleOAuthConfigFromEnv);

// ------------------------------ Services -------------------------------
export const postCategoryService = new PostCategoryService(postCategoryRepository);
export const userService = new UserService(userRepository);
export const authService = new AuthService(
  userRepository,
  sessionRepository,
  passwordHasher,
  sessionTokenService,
  googleIdentityProvider,
);

/** Cookie session helpers for pages, Server Actions and route handlers. */
export const session = createSessionHelpers(authService);

// ----------------------------- Controllers -----------------------------
export const postCategoryController = new PostCategoryController(postCategoryService);
export const googleAuthController = new GoogleAuthController(authService, session);
