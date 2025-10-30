import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

interface CreateCommentVariables {
    content: string;
    postId: string;
    parentId?: string;
}

export function useCreateComment({ screen }: { screen: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content, postId, parentId }: CreateCommentVariables) => {
            return api.post("/comment", { content, postId, parentId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [screen] });
        },
        onError: (error) => {
            console.error('Error creating comment:', error);
        },
    });
}
