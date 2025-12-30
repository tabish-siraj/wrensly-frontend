"use client";

import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateRepostVariables {
    parent_id: string;
}

export function useCreateRepost({ screen }: { screen: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ parent_id }: CreateRepostVariables) => {
            const response = await api.post(`/post/${parent_id}/repost`, {});

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to update repost");
            }

            return response.data;
        },
        onSuccess: (data) => {
            // Invalidate queries to refresh the feed
            queryClient.invalidateQueries({ queryKey: [screen] });
            queryClient.invalidateQueries({ queryKey: ["infinite-feed"] });

            // The response contains the repost data
            // If deletedAt is not null, it means the repost was undone
            // If deletedAt is null, it means the repost was created/restored
        },
        onError: (error) => {
            console.error('Error updating repost:', error);
        },
    });
}