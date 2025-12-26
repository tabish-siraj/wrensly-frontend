"use client";

import api from "@/lib/api";
import { normalizePosts } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useFeed() {
    const { data: feedResponse, isLoading: loading, error } = useQuery({
        queryKey: ["feed"],
        queryFn: async () => {
            const resp = await api.get("/feed");

            if (!resp.data.success) {
                throw new Error(resp.data.message || "Failed to load feed");
            }

            return {
                posts: normalizePosts(resp.data.data),
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
        meta: feedResponse?.meta
    };
}