import { PostNotFoundError } from "@/application/post/errors/PostNotFoundError";
import { IPostRepository } from "@/domain/post/repositories/IPostRepository";
import { PostComment } from "@/domain/postComment/entities/PostComment";
import { CommentThread } from "@/domain/postComment/readmodels/ThreadComment";
import { IPostCommentRepository } from "@/domain/postComment/repositories/IPostCommentRepository";
import { IPostCommentLikeRepository } from "@/domain/postCommentLike/repositories/IPostCommentLikeRepository";
import { CreateCommentInput } from "../../dtos/CreateCommentInput";
import { PostCommentNotFoundError } from "../../errors/PostCommentNotFoundError";
import { IPostCommentService } from "../interfaces/IPostCommentService";

export class PostCommentService implements IPostCommentService {
  constructor(
    private readonly postCommentRepository: IPostCommentRepository,
    private readonly postCommentLikeRepository: IPostCommentLikeRepository,
    private readonly postRepository: IPostRepository,
  ) {}

  async listThread(postId: string, viewerId: string | null): Promise<CommentThread[]> {
    const comments = await this.postCommentRepository.listByPost(postId, viewerId);
    const fatherOf = new Map(comments.map(({ comment }) => [comment.id!, comment.fatherId]));

    // Conversations are one level deep: a reply to a reply hangs from the top comment.
    const rootOf = (id: string): string => {
      let current = id;
      for (let father = fatherOf.get(current); father && fatherOf.has(father); father = fatherOf.get(current)) {
        current = father;
      }
      return current;
    };

    const threads = new Map<string, CommentThread>();
    for (const item of comments) {
      if (!item.comment.fatherId) threads.set(item.comment.id!, { ...item, replies: [] });
    }
    for (const item of comments) {
      if (item.comment.fatherId) threads.get(rootOf(item.comment.id!))?.replies.push(item);
    }
    return [...threads.values()];
  }

  async create(userId: string, { postId, content, parentId }: CreateCommentInput): Promise<PostComment> {
    const post = await this.postRepository.findById(postId);
    if (!post || !post.published) throw new PostNotFoundError(postId);

    if (parentId) {
      const parent = await this.postCommentRepository.findById(parentId);
      if (!parent || parent.postId !== postId) throw new PostCommentNotFoundError(parentId);
    }

    const comment = PostComment.create({ content, postId, userId, fatherId: parentId });
    return this.postCommentRepository.create(comment);
  }

  async toggleVote(commentId: string, userId: string): Promise<{ voted: boolean }> {
    const comment = await this.postCommentRepository.findById(commentId);
    if (!comment) throw new PostCommentNotFoundError(commentId);

    if (await this.postCommentLikeRepository.exists(commentId, userId)) {
      await this.postCommentLikeRepository.delete(commentId, userId);
      return { voted: false };
    }
    await this.postCommentLikeRepository.create(commentId, userId);
    return { voted: true };
  }
}
