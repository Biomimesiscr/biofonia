import "server-only";

import type { User } from "@/domain/user/entities/User";
import type { AuthorPost } from "@/domain/post/readmodels/AuthorPost";
import type { PostCategory } from "@/domain/postCategory/entities/PostCategory";
import { categoryTone } from "@/content/forum";
import { formatMonthYear, formatRelativeDate, initials } from "@/lib/format";
import type { CategoryOption, ProfileData, ProfilePostItem } from "./types";

const EXCERPT_LENGTH = 220;

export function toProfileData(user: User, posts: readonly AuthorPost[]): ProfileData {
  const name = user.name ?? user.email;
  const published = posts.filter(({ post }) => post.published);
  return {
    name,
    initials: initials(name),
    userType: user.userType,
    biography: user.biography,
    memberSince: formatMonthYear(user.createdAt),
    publishedCount: published.length,
    votesReceived: published.reduce((total, item) => total + item.likeCount, 0),
  };
}

export function toProfilePostItem({ post, category, likeCount, commentCount }: AuthorPost): ProfilePostItem {
  const content = post.content.trim();
  return {
    id: post.id,
    title: post.title,
    excerpt: content.length > EXCERPT_LENGTH ? `${content.slice(0, EXCERPT_LENGTH).trimEnd()}…` : content,
    published: post.published,
    category: category ? { ...category, tone: categoryTone(category.name) } : null,
    date: formatRelativeDate(post.updatedAt),
    views: post.impressionCount,
    comments: commentCount,
    votes: likeCount,
  };
}

export function toCategoryOption(category: PostCategory): CategoryOption {
  return { id: category.id!, name: category.name, tone: categoryTone(category.name) };
}
