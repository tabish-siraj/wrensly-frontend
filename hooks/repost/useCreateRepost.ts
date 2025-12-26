"use client";

import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreatePostVariables {
    parent_id: string;
}

export function useCreateRepost({ screen }: { screen: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ parent_id }: CreatePostVariables) => {
            const response = await api.post(`/post/${parent_id}/repost`, {});

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to create repost");
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [screen] });
            queryClient.invalidateQueries({ queryKey: ["infinite-feed"] });
        },
        onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error creating repost:', error);
            }
        },
    });
}