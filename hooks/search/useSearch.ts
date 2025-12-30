import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface SearchFilters {
    type?: 'all' | 'posts' | 'users' | 'hashtags';
    dateRange?: 'all' | 'today' | 'week' | 'month' | 'year';
    sortBy?: 'relevance' | 'recent' | 'popular';
}

// Unified search across all content types
export function useSearch(query: string, filters: SearchFilters = {}, enabled: boolean = true) {
    return useQuery({
        queryKey: ["search", query, filters],
        queryFn: async () => {
            if (!query || query.trim().length < 1) {
                return { posts: [], users: [], hashtags: [], total: 0 };
            }

            const params = new URLSearchParams();
            params.set('q', query.trim());

            if (filters.type) params.set('type', filters.type);
            if (filters.dateRange) params.set('dateRange', filters.dateRange);
            if (filters.sortBy) params.set('sortBy', filters.sortBy);

            const response = await api.get(`/search?${params.toString()}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Search failed");
            }

            return response.data.data;
        },
        enabled: enabled && !!query && query.trim().length >= 1,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

// Search posts with infinite scroll
export function useSearchPosts(query: string, filters: Omit<SearchFilters, 'type'> = {}) {
    return useInfiniteQuery({
        queryKey: ["search-posts", query, filters],
        queryFn: async ({ pageParam }) => {
            if (!query || query.trim().length < 1) {
                return { data: [], meta: { hasNextPage: false, nextCursor: null } };
            }

            const params = new URLSearchParams();
            params.set('q', query.trim());

            if (filters.dateRange) params.set('dateRange', filters.dateRange);
            if (filters.sortBy) params.set('sortBy', filters.sortBy);
            if (pageParam) params.set('cursor', pageParam as string);

            const response = await api.get(`/search/posts?${params.toString()}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Posts search failed");
            }

            return {
                data: response.data.data,
                meta: response.data.meta,
            };
        },
        getNextPageParam: (lastPage: any) => lastPage.meta?.nextCursor,
        initialPageParam: null,
        enabled: !!query && query.trim().length >= 1,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

// Search users with infinite scroll
export function useSearchUsers(query: string) {
    return useInfiniteQuery({
        queryKey: ["search-users", query],
        queryFn: async ({ pageParam }) => {
            if (!query || query.trim().length < 1) {
                return { data: [], meta: { hasNextPage: false, nextCursor: null } };
            }

            const params = new URLSearchParams();
            params.set('q', query.trim());
            if (pageParam) params.set('cursor', pageParam as string);

            const response = await api.get(`/search/users?${params.toString()}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Users search failed");
            }

            return {
                data: response.data.data,
                meta: response.data.meta,
            };
        },
        getNextPageParam: (lastPage: any) => lastPage.meta?.nextCursor,
        initialPageParam: null,
        enabled: !!query && query.trim().length >= 1,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

// Search hashtags
export function useSearchHashtags(query: string, limit: number = 10) {
    return useQuery({
        queryKey: ["search-hashtags", query, limit],
        queryFn: async () => {
            if (!query || query.trim().length < 1) {
                return [];
            }

            const params = new URLSearchParams();
            params.set('q', query.trim());
            params.set('limit', limit.toString());

            const response = await api.get(`/search/hashtags?${params.toString()}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Hashtags search failed");
            }

            return response.data.data;
        },
        enabled: !!query && query.trim().length >= 1,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

// Get search suggestions for autocomplete
export function useSearchSuggestions(query: string, enabled: boolean = true) {
    return useQuery({
        queryKey: ["search-suggestions", query],
        queryFn: async () => {
            if (!query || query.trim().length < 2) {
                return { users: [], hashtags: [], recent_searches: [] };
            }

            const params = new URLSearchParams();
            params.set('q', query.trim());

            const response = await api.get(`/search/suggestions?${params.toString()}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to get search suggestions");
            }

            return response.data.data;
        },
        enabled: enabled && !!query && query.trim().length >= 2,
        staleTime: 1 * 60 * 1000, // 1 minute
    });
}