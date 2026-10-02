import { PostNotFoundError } from "@/application/post/errors/PostNotFoundError";
import { IPostRepository } from "@/domain/post/repositories/IPostRepository";
import { IPostReportRepository } from "@/domain/postReport/repositories/IPostReportRepository";
import { PostReportReason } from "@/domain/postReportReason/readmodels/PostReportReason";
import { IPostReportReasonRepository } from "@/domain/postReportReason/repositories/IPostReportReasonRepository";
import { PostAlreadyReportedError } from "../../errors/PostAlreadyReportedError";
import { PostReportReasonNotFoundError } from "../../errors/PostReportReasonNotFoundError";
import { IPostReportService } from "../interfaces/IPostReportService";

export class PostReportService implements IPostReportService {
  constructor(
    private readonly postReportRepository: IPostReportRepository,
    private readonly postReportReasonRepository: IPostReportReasonRepository,
    private readonly postRepository: IPostRepository,
  ) {}

  async listReasons(): Promise<PostReportReason[]> {
    return this.postReportReasonRepository.list();
  }

  async reportPost(postId: string, userId: string, reasonId: string): Promise<void> {
    const post = await this.postRepository.findById(postId);
    if (!post || !post.published) throw new PostNotFoundError(postId);

    const reason = await this.postReportReasonRepository.findById(reasonId);
    if (!reason) throw new PostReportReasonNotFoundError(reasonId);

    if (await this.postReportRepository.exists(postId, userId)) throw new PostAlreadyReportedError(postId);
    await this.postReportRepository.create(postId, userId, reasonId);
  }
}
