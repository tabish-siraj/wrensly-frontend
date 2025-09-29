"use client";

import api from "@/lib/api";
import { normalizePosts } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useFeed() {
    const { data: posts, isLoading: loading, isError: error } = useQuery({
        queryKey: ["feed"],
        queryFn: async () => {
            const resp = await api.get("/feed");
            return normalizePosts(resp.data.data);
        },
    });

    return { posts, loading, error };
}