import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Post } from "@/src/types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const removeEmptyFields = (obj: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== null && value !== "" && value !== undefined)
  );
};

export function normalizePost(post: Post): Post {
  return {
    ...post
  };
}

export function normalizePosts(posts: Post[]): Post[] {
  if (!Array.isArray(posts)) {
    console.error("Expected posts to be an array:", posts);
    return [];
  }
  return posts.map(normalizePost);
}
