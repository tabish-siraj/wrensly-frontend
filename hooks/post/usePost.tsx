"use client";

import { useState, useEffect } from "react";
import { Posts } from "@/src/types";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePost() {
    const [posts, setPosts] = useState<Posts>({} as Posts);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await api.get("/post");
                setPosts(response.data);
            } catch (err) {
                setError("Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error };
}

export function usePostMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (post: { content: string, parentId: string | null }) => {
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