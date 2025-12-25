import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

interface CreateCommentVariables {
    content: string;
    post_id: string;
    parent_id?: string;
}

export function useCreateComment({ screen }: { screen: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content, post_id, parent_id }: CreateCommentVariables) => {
            return api.post(`/post/${post_id}/comment`, { content, parent_id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [screen] });
        },
        onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error creating comment:', error);
            }
        },
    });
}
