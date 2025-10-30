"use client";

import api from "@/lib/api";
import { normalizePosts } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function usePostComments(postId: string) {
    const { data: comments, isLoading: loading, isError: error } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            const resp = await api.get(`/post/${postId}/comments`);
            return normalizePosts(resp.data.data);
        },
        enabled: !!postId,
    });

    return { comments, loading, error };
}
