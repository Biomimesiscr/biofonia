import { PostCategory } from "@/domain/postCategory/entities/PostCategory";

export type PostCategoryField = "id" | "name";

export interface IPostCategoryRepository {
  all(): Promise<PostCategory[]>;
  findOne(value: string, field?: PostCategoryField): Promise<PostCategory | null>;
  /** Persists a new category and returns it with its generated id. */
  create(postCategory: PostCategory): Promise<PostCategory>;
  update(postCategory: PostCategory): Promise<PostCategory>;
  delete(postCategoryId: string): Promise<void>;
}
