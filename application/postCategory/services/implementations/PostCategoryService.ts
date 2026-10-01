import { PostCategory } from "@/domain/postCategory/entities/PostCategory";
import { IPostCategoryRepository } from "@/domain/postCategory/repositories/IPostCategoryRepository";
import { CreatePostCategoryInput } from "../../dtos/CreatePostCategoryInput";
import { UpdatePostCategoryInput } from "../../dtos/UpdatePostCategoryInput";
import { PostCategoryAlreadyExistsError } from "../../errors/PostCategoryAlreadyExistsError";
import { PostCategoryNotFoundError } from "../../errors/PostCategoryNotFoundError";
import { IPostCategoryService } from "../interfaces/IPostCategoryService";

export class PostCategoryService implements IPostCategoryService {
  constructor(
    private readonly postCategoryRepository: IPostCategoryRepository,
  ) {}

  async list(): Promise<PostCategory[]> {
    return this.postCategoryRepository.all();
  }

  async get(id: string): Promise<PostCategory> {
    const postCategory = await this.postCategoryRepository.findOne(id, "id");
    if (!postCategory) throw new PostCategoryNotFoundError(id);
    return postCategory;
  }

  async create(input: CreatePostCategoryInput): Promise<PostCategory> {
    const postCategory = PostCategory.create(input);
    await this.assertNameIsFree(postCategory.name);
    return this.postCategoryRepository.create(postCategory);
  }

  async update(id: string, input: UpdatePostCategoryInput): Promise<PostCategory> {
    const postCategory = await this.get(id);

    if (input.name !== undefined) {
      postCategory.rename(input.name);
      await this.assertNameIsFree(postCategory.name, id);
    }

    return this.postCategoryRepository.update(postCategory);
  }

  async delete(id: string): Promise<void> {
    await this.get(id);
    await this.postCategoryRepository.delete(id);
  }

  private async assertNameIsFree(name: string, exceptId?: string): Promise<void> {
    const existing = await this.postCategoryRepository.findOne(name, "name");
    if (existing && existing.id !== exceptId) {
      throw new PostCategoryAlreadyExistsError(name);
    }
  }
}
