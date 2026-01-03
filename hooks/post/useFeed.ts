"use client";

import api from "@/lib/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface FeedData {
    posts: any[];
    meta: any;
}

interface UseFeedReturn {
    posts: any[];
    loading: boolean;
    error: { message: string; } | null;
    meta: any;
    refetch: () => void;
}

export function useFeed(): UseFeedReturn {
    const { data: feedResponse, isLoading: loading, error, refetch } = useQuery<FeedData>({
        queryKey: ["feed"],
        queryFn: async () => {
            const resp = await api.get("/feed");

            if (!resp.data.success) {
                throw new Error(resp.data.message || "Failed to load feed");
            }

            // Deduplicate posts by ID to prevent duplicate key errors
            const posts = resp.data.data || [];
            const uniquePosts = posts.filter((post: any, index: number, array: any[]) =>
                array.findIndex(p => p.id === post.id) === index
            );

            return {
                posts: uniquePosts,
                meta: resp.data.meta
            };
        },
        retry: 3,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        posts: feedResponse?.posts || [],
        loading,
        error: error ? { message: error.message || 'Failed to load feed' } : null,
        meta: feedResponse?.meta,
        refetch: () => refetch()
    };
}