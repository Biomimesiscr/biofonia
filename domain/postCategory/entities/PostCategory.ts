import { PostCategoryName } from "../valueobjects/PostCategoryName.vo";

export class PostCategory {
  private props: PostCategoryProps;

  private constructor(props: PostCategoryProps) {
    this.props = props;
  }

  /** Builds a new category that has not been persisted yet (no id). */
  static create(props: NewPostCategoryProps): PostCategory {
    const now = new Date();
    return new PostCategory({
      id: null,
      name: PostCategoryName.create(props.name),
      createdAt: now,
      updatedAt: now,
    });
  }

  /** Rebuilds a persisted category (used by infrastructure mappers). */
  static restore(props: PostCategoryConstructorProps): PostCategory {
    return new PostCategory({
      ...props,
      name: PostCategoryName.create(props.name),
    });
  }

  rename(name: string): void {
    this.props.name = PostCategoryName.create(name);
    this.props.updatedAt = new Date();
  }

  get id(): string | null {
    return this.props.id;
  }

  get name(): string {
    return this.props.name.value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export interface PostCategoryProps {
  id: string | null;
  name: PostCategoryName;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostCategoryConstructorProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewPostCategoryProps {
  name: string;
}
