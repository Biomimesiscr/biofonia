import { PostCategory } from "@/domain/postCategory/entities/PostCategory";
import { CreatePostCategoryInput } from "../../dtos/CreatePostCategoryInput";
import { UpdatePostCategoryInput } from "../../dtos/UpdatePostCategoryInput";

export interface IPostCategoryService {
  list(): Promise<PostCategory[]>;
  get(id: string): Promise<PostCategory>;
  create(input: CreatePostCategoryInput): Promise<PostCategory>;
  update(id: string, input: UpdatePostCategoryInput): Promise<PostCategory>;
  delete(id: string): Promise<void>;
}
