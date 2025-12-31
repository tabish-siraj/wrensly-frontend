import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export function useCreateComment({ screen, root_post_id }: { screen: string; root_post_id?: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content, post_id }: { content: string; post_id: string }) => {
            const response = await api.post(`/post/${post_id}/comment`, { content });

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to create comment");
            }

            return response.data;
        },
        onSuccess: () => {
            // Invalidate general queries
            queryClient.invalidateQueries({ queryKey: [screen] });
            queryClient.invalidateQueries({ queryKey: ["infinite-feed"] });

            // Invalidate specific comments query if we have the root post ID
            if (root_post_id) {
                queryClient.invalidateQueries({ queryKey: ["comments", root_post_id] });
            }
        },
        onError: (error) => {
            console.error('Error creating comment:', error);
        },
    });
}
