"use client";

import api from "@/lib/api";
import { normalizePosts } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Post } from "@/src/types";

interface FeedResponse {
    data: Post[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
        };
    };
}

export function useInfiniteFeed() {
    return useInfiniteQuery({
        queryKey: ["infinite-feed"],
        queryFn: async ({ pageParam = 1 }) => {
            const resp = await api.get(`/feed?page=${pageParam}&limit=10`);

            // Handle both paginated and non-paginated responses
            if (resp.data.meta?.pagination) {
                return {
                    data: normalizePosts(resp.data.data),
                    meta: resp.data.meta
                } as FeedResponse;
            } else {
                // Fallback for non-paginated response
                const posts = normalizePosts(resp.data.data);
                return {
                    data: posts,
                    meta: {
                        pagination: {
                            page: pageParam,
                            limit: 10,
                            total: posts.length,
                            totalPages: 1,
                            hasNextPage: false
                        }
                    }
                } as FeedResponse;
            }
        },
        getNextPageParam: (lastPage) => {
            const { pagination } = lastPage.meta;
            return pagination.hasNextPage ? pagination.page + 1 : undefined;
        },
        initialPageParam: 1,
        retry: 3,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

export function useInfiniteUserPosts(username: string) {
    return useInfiniteQuery({
        queryKey: ["infinite-user-posts", username],
        queryFn: async ({ pageParam = 1 }) => {
            const resp = await api.get(`/post/user/${username}?page=${pageParam}&limit=10`);

            if (resp.data.meta?.pagination) {
                return {
                    data: normalizePosts(resp.data.data),
                    meta: resp.data.meta
                } as FeedResponse;
            } else {
                const posts = normalizePosts(resp.data.data);
                return {
                    data: posts,
                    meta: {
                        pagination: {
                            page: pageParam,
                            limit: 10,
                            total: posts.length,
                            totalPages: 1,
                            hasNextPage: false
                        }
                    }
                } as FeedResponse;
            }
        },
        getNextPageParam: (lastPage) => {
            const { pagination } = lastPage.meta;
            return pagination.hasNextPage ? pagination.page + 1 : undefined;
        },
        initialPageParam: 1,
        enabled: !!username,
        retry: 3,
        staleTime: 2 * 60 * 1000,
    });
}