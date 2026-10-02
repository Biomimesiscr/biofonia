import "server-only";

import { AuthService } from "@/application/auth/services/implementations/AuthService";
import { PostService } from "@/application/post/services/implementations/PostService";
import { PostCommentService } from "@/application/postComment/services/implementations/PostCommentService";
import { PostReportService } from "@/application/postReport/services/implementations/PostReportService";
import { PostCategoryService } from "@/application/postCategory/services/implementations/PostCategoryService";
import { UserService } from "@/application/user/services/implementations/UserService";
import { CryptoSessionTokenService } from "@/infrastructure/auth/CryptoSessionTokenService";
import {
  GoogleOAuthIdentityProvider,
  googleOAuthConfigFromEnv,
} from "@/infrastructure/auth/GoogleOAuthIdentityProvider";
import { ScryptPasswordHasher } from "@/infrastructure/auth/ScryptPasswordHasher";
import { PrismaPostRepository } from "@/infrastructure/post/repositories/PrismaPostRepository";
import { PrismaPostCommentRepository } from "@/infrastructure/postComment/repositories/PrismaPostCommentRepository";
import { PrismaPostCommentLikeRepository } from "@/infrastructure/postCommentLike/repositories/PrismaPostCommentLikeRepository";
import { PrismaPostReportRepository } from "@/infrastructure/postReport/repositories/PrismaPostReportRepository";
import { PrismaPostReportReasonRepository } from "@/infrastructure/postReportReason/repositories/PrismaPostReportReasonRepository";
import { PrismaPostCategoryRepository } from "@/infrastructure/postCategory/repositories/PrismaPostCategoryRepository";
import { PrismaPostLikeRepository } from "@/infrastructure/postLike/repositories/PrismaPostLikeRepository";
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
const postRepository = new PrismaPostRepository();
const postLikeRepository = new PrismaPostLikeRepository();
const postCommentRepository = new PrismaPostCommentRepository();
const postCommentLikeRepository = new PrismaPostCommentLikeRepository();
const postReportRepository = new PrismaPostReportRepository();
const postReportReasonRepository = new PrismaPostReportReasonRepository();
const userRepository = new PrismaUserRepository();
const sessionRepository = new PrismaSessionRepository();

// ------------------------ External services --------------------------
const passwordHasher = new ScryptPasswordHasher();
const sessionTokenService = new CryptoSessionTokenService();
// Env is read lazily so the app boots without Google credentials.
const googleIdentityProvider = new GoogleOAuthIdentityProvider(googleOAuthConfigFromEnv);

// ------------------------------ Services -------------------------------
export const postCategoryService = new PostCategoryService(postCategoryRepository);
export const postService = new PostService(postRepository, postCategoryRepository, postLikeRepository);
export const postCommentService = new PostCommentService(
  postCommentRepository,
  postCommentLikeRepository,
  postRepository,
);
export const postReportService = new PostReportService(
  postReportRepository,
  postReportReasonRepository,
  postRepository,
);
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
