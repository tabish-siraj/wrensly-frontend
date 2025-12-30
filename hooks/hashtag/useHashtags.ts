import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

// Get trending hashtags
export function useTrendingHashtags(limit: number = 10) {
    return useQuery({
        queryKey: ["trending-hashtags", limit],
        queryFn: async () => {
            const response = await api.get(`/hashtag/trending?limit=${limit}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch trending hashtags");
            }

            return response.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    });
}

// Search hashtags
export function useSearchHashtags(query: string, enabled: boolean = true) {
    return useQuery({
        queryKey: ["search-hashtags", query],
        queryFn: async () => {
            if (!query || query.length < 1) {
                return [];
            }

            const response = await api.get(`/hashtag/search?q=${encodeURIComponent(query)}&limit=10`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to search hashtags");
            }

            return response.data.data;
        },
        enabled: enabled && !!query && query.length >= 1,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

// Get hashtag details
export function useHashtagDetails(hashtag: string) {
    return useQuery({
        queryKey: ["hashtag-details", hashtag],
        queryFn: async () => {
            const response = await api.get(`/hashtag/${encodeURIComponent(hashtag)}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch hashtag details");
            }

            return response.data.data;
        },
        enabled: !!hashtag,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Get posts by hashtag with infinite scroll
export function useHashtagPosts(hashtag: string) {
    return useQuery({
        queryKey: ["hashtag-posts", hashtag],
        queryFn: async () => {
            const response = await api.get(`/hashtag/${encodeURIComponent(hashtag)}/posts`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch hashtag posts");
            }

            return response.data.data;
        },
        enabled: !!hashtag,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}