"use client";

import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreatePostVariables {
    content: string;
    parent_id: string;
}

export function useCreateQuote({ screen }: { screen: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content, parent_id }: CreatePostVariables) => {
            return api.post(`/post/${parent_id}/quote`, { content, parent_id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [screen] });
        },
        onError: (error) => {
            console.error('Error creating quote:', error);
        },
    });
}