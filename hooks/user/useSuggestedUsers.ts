"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface SuggestedUser {
    id: string;
    username: string;
    first_name?: string;
    last_name?: string;
    avatar?: string | null;
    bio?: string | null;
    _count: {
        followers: number;
        posts: number;
    };
    isFollowing: boolean;
    followsYou: boolean;
}

interface PaginatedResponse {
    data: SuggestedUser[];
    meta: {
        pagination: {
            cursor: string | null;
            has_next_page: boolean;
            has_previous_page: boolean;
        };
    };
}

interface UseSuggestedUsersOptions {
    limit?: number;
    cursor?: string;
    enabled?: boolean;
}

export const useSuggestedUsers = (options: UseSuggestedUsersOptions = {}) => {
    const { limit = 10, cursor, enabled = true } = options;

    return useQuery({
        queryKey: ["suggested-users", limit, cursor],
        queryFn: async (): Promise<PaginatedResponse> => {
            const params = new URLSearchParams();
            params.append('limit', limit.toString());
            if (cursor) {
                params.append('cursor', cursor);
            }

            const response = await api.get(`/user/suggested?${params.toString()}`);
            return response.data;
        },
        enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
};