import { IPostCategoryService } from "@/application/postCategory/services/interfaces/IPostCategoryService";
import { parseBody } from "@/presentation/core/http/parseBody";
import PostCategoryMapper from "../mappers/postCategory.mapper";
import {
  CreatePostCategorySchema,
  UpdatePostCategorySchema,
} from "../validators/postCategory.validator";

type IdContext = { params: Promise<{ id: string }> };

export default class PostCategoryController {
  constructor(private readonly postCategoryService: IPostCategoryService) {}

  async list(): Promise<Response> {
    const postCategories = await this.postCategoryService.list();
    return Response.json(postCategories.map(PostCategoryMapper.toResponse));
  }

  async get(_request: Request, { params }: IdContext): Promise<Response> {
    const { id } = await params;
    const postCategory = await this.postCategoryService.get(id);
    return Response.json(PostCategoryMapper.toResponse(postCategory));
  }

  async create(request: Request): Promise<Response> {
    const body = await parseBody(request, CreatePostCategorySchema);
    const created = await this.postCategoryService.create(body);
    return Response.json(PostCategoryMapper.toResponse(created), { status: 201 });
  }

  async update(request: Request, { params }: IdContext): Promise<Response> {
    const { id } = await params;
    const body = await parseBody(request, UpdatePostCategorySchema);
    const updated = await this.postCategoryService.update(id, body);
    return Response.json(PostCategoryMapper.toResponse(updated));
  }

  async delete(_request: Request, { params }: IdContext): Promise<Response> {
    const { id } = await params;
    await this.postCategoryService.delete(id);
    return new Response(null, { status: 204 });
  }
}
