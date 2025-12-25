"use client";

import api from "@/lib/api";
import { normalizePosts } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useFeed() {
    const { data: posts, isLoading: loading, error } = useQuery({
        queryKey: ["feed"],
        queryFn: async () => {
            const resp = await api.get("/feed");
            return normalizePosts(resp.data.data);
        },
        retry: 3,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        posts,
        loading,
        error: error ? { message: error.message || 'Failed to load feed' } : null
    };
}