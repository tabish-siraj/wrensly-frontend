import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export function useCreateComment({ screen }: { screen: string }) {
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
            queryClient.invalidateQueries({ queryKey: [screen] });
            queryClient.invalidateQueries({ queryKey: ["infinite-feed"] });
        },
        onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error creating comment:', error);
            }
        },
    });
}
