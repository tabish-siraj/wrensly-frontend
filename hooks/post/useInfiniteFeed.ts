"use client";

import api from "@/lib/api";
import { normalizePosts } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Post } from "@/src/types";

interface FeedResponse {
    success: boolean;
    message: string;
    data: Post[];
    meta: {
        pagination: {
            cursor: string;
            has_next_page: boolean;
            has_previous_page: boolean;
        };
        timestamp: string;
    };
}

export function useInfiniteFeed() {
    return useInfiniteQuery({
        queryKey: ["infinite-feed"],
        queryFn: async ({ pageParam }: { pageParam?: string }) => {
            const url = pageParam
                ? `/feed?cursor=${pageParam}&limit=10`
                : `/feed?limit=10`;

            const resp = await api.get(url);

            if (!resp.data.success) {
                throw new Error(resp.data.message || "Failed to fetch feed");
            }

            return {
                success: resp.data.success,
                message: resp.data.message,
                data: normalizePosts(resp.data.data),
                meta: resp.data.meta
            } as FeedResponse;
        },
        getNextPageParam: (lastPage) => {
            return lastPage.meta.pagination.has_next_page
                ? lastPage.meta.pagination.cursor
                : undefined;
        },
        initialPageParam: undefined as string | undefined,
        retry: 3,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

export function useInfiniteUserPosts(userId: string) {
    return useInfiniteQuery({
        queryKey: ["infinite-user-posts", userId],
        queryFn: async ({ pageParam }: { pageParam?: string }) => {
            const url = pageParam
                ? `/post/user/${userId}?cursor=${pageParam}&limit=10`
                : `/post/user/${userId}?limit=10`;

            const resp = await api.get(url);

            if (!resp.data.success) {
                throw new Error(resp.data.message || "Failed to fetch user posts");
            }

            return {
                success: resp.data.success,
                message: resp.data.message,
                data: normalizePosts(resp.data.data),
                meta: resp.data.meta
            } as FeedResponse;
        },
        getNextPageParam: (lastPage) => {
            return lastPage.meta.pagination.has_next_page
                ? lastPage.meta.pagination.cursor
                : undefined;
        },
        initialPageParam: undefined as string | undefined,
        enabled: !!userId,
        retry: 3,
        staleTime: 2 * 60 * 1000,
    });
}