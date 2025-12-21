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
            return api.post(`/post/${parent_id}/repost`, { parent_id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [screen] });
        },
        onError: (error) => {
            console.error('Error creating repost:', error);
        },
    });
}