export class Post {
  private props: PostProps;

  private constructor(props: PostProps) {
    this.props = props;
  }

  /** Rebuilds a persisted post (used by infrastructure mappers). */
  static restore(props: PostProps): Post {
    return new Post({ ...props });
  }

  get id(): string {
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
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  postCategoryId: string | null;
  impressionCount: number;
  createdAt: Date;
  updatedAt: Date;
}
