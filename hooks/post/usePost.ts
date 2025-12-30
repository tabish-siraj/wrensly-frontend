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

            // Deduplicate posts by ID
            const posts = resp.data.data || [];
            const uniquePosts = posts.filter((post: any, index: number, array: any[]) =>
                array.findIndex(p => p.id === post.id) === index
            );

            return {
                posts: uniquePosts,
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

export function usePostByID(post_id: string) {
    const { data: postResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["post", post_id],
        queryFn: async () => {
            const resp = await api.get(`/post/${post_id}`);

            if (!resp.data.success) {
                throw new Error(resp.data.message || "Failed to fetch post");
            }

            return {
                post: resp.data.data, // Use raw data
                meta: resp.data.meta
            };
        },
        enabled: !!post_id,
    });

    return {
        post: postResponse?.post,
        loading,
        error,
        meta: postResponse?.meta
    };
}

export function usePostByUserID(user_id: string) {
    const { data: postsResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["posts", user_id],
        queryFn: async () => {
            const response = await api.get(`/post/user/${user_id}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch user posts");
            }

            // Deduplicate posts by ID
            const posts = response.data.data || [];
            const uniquePosts = posts.filter((post: any, index: number, array: any[]) =>
                array.findIndex(p => p.id === post.id) === index
            );

            return {
                ...response.data,
                data: uniquePosts
            };
        },
        enabled: !!user_id,
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
    const user_id = userData?.id;

    const { data: postsResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["posts", "user", user_id],
        queryFn: async () => {
            if (!user_id) {
                throw new Error("User ID not available");
            }

            const response = await api.get(`/post/user/${user_id}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch user posts");
            }

            // Deduplicate posts by ID
            const posts = response.data.data || [];
            const uniquePosts = posts.filter((post: any, index: number, array: any[]) =>
                array.findIndex(p => p.id === post.id) === index
            );

            return {
                ...response.data,
                data: uniquePosts
            };
        },
        enabled: !!user_id, // Only run when we have a user ID
    });

    return {
        posts: postsResponse || { data: [] },
        loading: loading || !user_id, // Show loading while getting user ID too
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
            queryClient.invalidateQueries({
                queryKey: ["feed"],
            });
        },
    });
}

// New hook for creating comments
export function useCommentMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ post_id, content }: { post_id: string; content: string }) => {
            const response = await api.post(`/post/${post_id}/comment`, { content });

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to create comment");
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["feed"] });
        },
    });
}

// New hook for creating quote posts
export function useQuoteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ post_id, content }: { post_id: string; content: string }) => {
            const response = await api.post(`/post/${post_id}/quote`, { content });

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to create quote");
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["feed"] });
        },
    });
}

// New hook for reposts
export function useRepostMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (post_id: string) => {
            const response = await api.post(`/post/${post_id}/repost`, {});

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to repost");
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["feed"] });
        },
    });
}
