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
            return api.post("/post", {
                content,
                parent_id,
                type: POST_TYPE.QUOTE
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [screen] });
        },
        onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error creating quote:', error);
            }
        },
    });
}