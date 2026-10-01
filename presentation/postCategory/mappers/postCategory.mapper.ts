import { PostCategory } from "@/domain/postCategory/entities/PostCategory";
import { PostCategoryResponse } from "../responses/PostCategoryResponse";

export default class PostCategoryMapper {
  static toResponse(entity: PostCategory): PostCategoryResponse {
    return {
      // Entities reaching presentation are always persisted, so id is set.
      id: entity.id!,
      name: entity.name,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
