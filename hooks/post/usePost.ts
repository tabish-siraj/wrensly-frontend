"use client";

import api from "@/lib/api";
import { normalizePosts, normalizePost } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function usePost() {
    const { data: posts, isLoading: loading, isError: error } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const resp = await api.get("/post");
            const noramalizedPost = normalizePosts(resp.data.data);
            return noramalizedPost;
        },
    });

    return { posts, loading, error };
}

export function usePostByID(postID: string) {
    const { data: post, isLoading: loading, isError: error } = useQuery({
        queryKey: ["post", postID],
        queryFn: async () => {
            const resp = await api.get(`/post/${postID}`);
            return normalizePost(resp.data.data);
        },
    });

    return { post, loading, error };
}

export function usePostByUserID(userID: string) {
    const { data: posts, isLoading: loading, isError: error } = useQuery({
        queryKey: ["posts", userID],
        queryFn: async () => {
            const response = await api.get(`/post/user/${userID}`);
            return response.data;
        },
    });

    return { posts, loading, error };
}


export function usePostByUsername(username: string) {
    const { data: posts, isLoading: loading, isError: error } = useQuery({
        queryKey: ["posts", username],
        queryFn: async () => {
            const response = await api.get(`/post/username/${username}`);
            return response.data;
        },
    });
    return { posts, loading, error };
}

export function usePostMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (post: { content: string | null, parentId: string | null }) => {
            const response = await api.post("/post", post);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
    });
}
