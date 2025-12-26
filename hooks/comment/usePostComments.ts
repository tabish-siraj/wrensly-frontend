"use client";

import api from "@/lib/api";
import { normalizePosts } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function usePostComments(postId: string) {
    const { data: commentsResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            const resp = await api.get(`/post/${postId}/comments`);

            if (!resp.data.success) {
                throw new Error(resp.data.message || "Failed to fetch comments");
            }

            return {
                comments: normalizePosts(resp.data.data),
                meta: resp.data.meta
            };
        },
        enabled: !!postId,
    });

    return {
        comments: commentsResponse?.comments || [],
        loading,
        error,
        meta: commentsResponse?.meta
    };
}
