import { PostContent } from "../valueobjects/PostContent.vo";
import { PostTitle } from "../valueobjects/PostTitle.vo";

export class Post {
  private props: PostProps;

  private constructor(props: PostProps) {
    this.props = props;
  }

  /** Builds a new post that has not been persisted yet (no id). */
  static create(props: NewPostProps): Post {
    const now = new Date();
    return new Post({
      id: null,
      title: PostTitle.create(props.title).value,
      content: PostContent.create(props.content).value,
      published: props.published,
      authorId: props.authorId,
      postCategoryId: props.postCategoryId,
      impressionCount: 0,
      createdAt: now,
      updatedAt: now,
    });
  }

  /**
   * Rebuilds a persisted post (used by infrastructure mappers). Not re-validated:
   * rows written before a rule existed must still load.
   */
  static restore(props: PersistedPostProps): Post {
    return new Post({ ...props });
  }

  get id(): string | null {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get published(): boolean {
    return this.props.published;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  get postCategoryId(): string | null {
    return this.props.postCategoryId;
  }

  get impressionCount(): number {
    return this.props.impressionCount;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export interface PostProps {
  id: string | null;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  postCategoryId: string | null;
  impressionCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersistedPostProps extends PostProps {
  id: string;
}

export interface NewPostProps {
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  postCategoryId: string;
}
