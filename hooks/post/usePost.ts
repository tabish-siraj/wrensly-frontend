"use client";

import api from "@/lib/api";
import { normalizePosts, normalizePost } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserByUsername } from "@/hooks/user/useGetUser";

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
    // First get the user data to get the user ID
    const { user: userData } = useUserByUsername(username);
    const userId = userData?.id;

    const { data: postsResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["posts", "user", userId],
        queryFn: async () => {
            if (!userId) {
                throw new Error("User ID not available");
            }

            const response = await api.get(`/post/user/${userId}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch user posts");
            }

            return response.data;
        },
        enabled: !!userId, // Only run when we have a user ID
    });

    return {
        posts: postsResponse || { data: [] },
        loading: loading || !userId, // Show loading while getting user ID too
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
