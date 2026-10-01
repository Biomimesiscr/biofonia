import type {
  Prisma,
  PostCategory as PrismaPostCategory,
} from "@/generated/prisma/client";
import { PostCategory } from "@/domain/postCategory/entities/PostCategory";

export class PrismaPostCategoryMapper {
  static toDomain(row: PrismaPostCategory): PostCategory {
    return PostCategory.restore({
      id: row.id,
      name: row.name,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toPersistence(entity: PostCategory): Prisma.PostCategoryCreateInput {
    return {
      ...(entity.id ? { id: entity.id } : {}),
      name: entity.name,
    };
  }
}
