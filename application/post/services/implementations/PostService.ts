import { PostCategoryNotFoundError } from "@/application/postCategory/errors/PostCategoryNotFoundError";
import { Post } from "@/domain/post/entities/Post";
import { AuthorPost } from "@/domain/post/readmodels/AuthorPost";
import { ForumPost } from "@/domain/post/readmodels/ForumPost";
import {
  IPostRepository,
  ListByAuthorOptions,
  ListPublishedOptions,
} from "@/domain/post/repositories/IPostRepository";
import { IPostCategoryRepository } from "@/domain/postCategory/repositories/IPostCategoryRepository";
import { IPostLikeRepository } from "@/domain/postLike/repositories/IPostLikeRepository";
import { CreatePostInput } from "../../dtos/CreatePostInput";
import { ForumQuery, ForumSort } from "../../dtos/ForumQuery";
import { PostNotFoundError } from "../../errors/PostNotFoundError";
import { ForumCounts, IPostService } from "../interfaces/IPostService";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
/** "Recientes" has no time window, so it is capped. */
const RECENT_LIMIT = 50;

function hoursAgo(hours: number): Date {
  return new Date(Date.now() - hours * HOUR);
}

const sortOptions: Record<ForumSort, () => Omit<ListPublishedOptions, "categoryId" | "viewerId">> = {
  today: () => ({ since: hoursAgo(24), orderBy: "votes" }),
  recent: () => ({ orderBy: "recent", limit: RECENT_LIMIT }),
  month: () => ({ since: new Date(Date.now() - 30 * DAY), orderBy: "votes" }),
};

export class PostService implements IPostService {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly postCategoryRepository: IPostCategoryRepository,
    private readonly postLikeRepository: IPostLikeRepository,
  ) {}

  async listByAuthor(authorId: string, options: ListByAuthorOptions): Promise<AuthorPost[]> {
    return this.postRepository.listByAuthor(authorId, options);
  }

  async listForum({ categoryId, sort, viewerId }: ForumQuery): Promise<ForumPost[]> {
    return this.postRepository.listPublished({ ...sortOptions[sort](), categoryId, viewerId });
  }

  async topOfMonth(limit = 3): Promise<ForumPost[]> {
    return this.postRepository.listPublished({ ...sortOptions.month(), limit });
  }

  async countToday(): Promise<ForumCounts> {
    const byCategory = await this.postRepository.countPublishedByCategory(hoursAgo(24));
    const total = Object.values(byCategory).reduce((sum, count) => sum + count, 0);
    return { total, byCategory };
  }

  async create(authorId: string, input: CreatePostInput): Promise<Post> {
    const category = await this.postCategoryRepository.findOne(input.postCategoryId, "id");
    if (!category) throw new PostCategoryNotFoundError(input.postCategoryId);

    const post = Post.create({
      title: input.title,
      content: input.content,
      published: input.publish,
      authorId,
      postCategoryId: input.postCategoryId,
    });
    return this.postRepository.create(post);
  }

  async toggleVote(postId: string, userId: string): Promise<{ voted: boolean }> {
    const post = await this.postRepository.findById(postId);
    if (!post || !post.published) throw new PostNotFoundError(postId);

    if (await this.postLikeRepository.exists(postId, userId)) {
      await this.postLikeRepository.delete(postId, userId);
      return { voted: false };
    }
    await this.postLikeRepository.create(postId, userId);
    return { voted: true };
  }
}
