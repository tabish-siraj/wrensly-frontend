"use client";

import api from "@/lib/api";
import { normalizePosts, normalizePost } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function usePost() {
    const { data: postsResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const resp = await api.get("/post");

            if (!resp.data.success) {
                throw new Error(resp.data.message || "Failed to fetch posts");
            }

            return {
                posts: normalizePosts(resp.data.data),
                meta: resp.data.meta
            };
        },
    });

    return {
        posts: postsResponse?.posts || [],
        loading,
        error,
        meta: postsResponse?.meta
    };
}

export function usePostByID(postID: string) {
    const { data: postResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["post", postID],
        queryFn: async () => {
            const resp = await api.get(`/post/${postID}`);

            if (!resp.data.success) {
                throw new Error(resp.data.message || "Failed to fetch post");
            }

            return {
                post: normalizePost(resp.data.data),
                meta: resp.data.meta
            };
        },
        enabled: !!postID,
    });

    return {
        post: postResponse?.post,
        loading,
        error,
        meta: postResponse?.meta
    };
}

export function usePostByUserID(userID: string) {
    const { data: postsResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["posts", userID],
        queryFn: async () => {
            const response = await api.get(`/post/user/${userID}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch user posts");
            }

            return response.data;
        },
        enabled: !!userID,
    });

    return {
        posts: postsResponse?.data || [],
        loading,
        error,
        meta: postsResponse?.meta
    };
}


export function usePostByUsername(username: string) {
    const { data: postsResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["posts", username],
        queryFn: async () => {
            const response = await api.get(`/post`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch posts");
            }

            return response.data;
        },
        enabled: !!username,
    });

    return {
        posts: postsResponse?.data || [],
        loading,
        error,
        meta: postsResponse?.meta
    };
}

export function usePostMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (post: { content: string | null, parent_id: string | null }) => {
            const response = await api.post("/post", post);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to create post");
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
            queryClient.invalidateQueries({
                queryKey: ["infinite-feed"],
            });
        },
    });
}
