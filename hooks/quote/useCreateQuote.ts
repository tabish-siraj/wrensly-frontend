"use client";

import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POST_TYPE } from "@/src/constants";

interface CreatePostVariables {
    content: string;
    parent_id: string;
}

export function useCreateQuote({ screen }: { screen: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content, parent_id }: CreatePostVariables) => {
            const response = await api.post(`/post/${parent_id}/quote`, { content });

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to create quote");
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [screen] });
            queryClient.invalidateQueries({ queryKey: ["infinite-feed"] });
        },
        onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error creating quote:', error);
            }
        },
    });
}