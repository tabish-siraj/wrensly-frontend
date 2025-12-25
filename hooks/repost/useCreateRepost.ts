"use client";

import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POST_TYPE } from "@/src/constants";

interface CreatePostVariables {
    parent_id: string;
}

export function useCreateRepost({ screen }: { screen: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ parent_id }: CreatePostVariables) => {
            return api.post("/post", {
                parent_id,
                type: POST_TYPE.REPOST,
                content: "" // Empty content for pure reposts
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [screen] });
        },
        onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error creating repost:', error);
            }
        },
    });
}