import { PostCommentContent } from "../valueobjects/PostCommentContent.vo";

export class PostComment {
  private props: PostCommentProps;

  private constructor(props: PostCommentProps) {
    this.props = props;
  }

  /** Builds a new comment (or reply, when `fatherId` is set) that has not been persisted yet. */
  static create(props: NewPostCommentProps): PostComment {
    return new PostComment({
      id: null,
      content: PostCommentContent.create(props.content).value,
      postId: props.postId,
      userId: props.userId,
      fatherId: props.fatherId,
      createdAt: new Date(),
    });
  }

  /**
   * Rebuilds a persisted comment (used by infrastructure mappers). Not re-validated:
   * rows written before a rule existed must still load.
   */
  static restore(props: PersistedPostCommentProps): PostComment {
    return new PostComment({ ...props });
  }

  get id(): string | null {
    return this.props.id;
  }

  get content(): string {
    return this.props.content;
  }

  get postId(): string {
    return this.props.postId;
  }

  get userId(): string {
    return this.props.userId;
  }

  /** The comment this one replies to; `null` for a top-level comment. */
  get fatherId(): string | null {
    return this.props.fatherId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

export interface PostCommentProps {
  id: string | null;
  content: string;
  postId: string;
  userId: string;
  fatherId: string | null;
  createdAt: Date;
}

export interface PersistedPostCommentProps extends PostCommentProps {
  id: string;
}

export interface NewPostCommentProps {
  content: string;
  postId: string;
  userId: string;
  fatherId: string | null;
}
