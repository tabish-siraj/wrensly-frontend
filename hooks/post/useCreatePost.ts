import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

interface CreatePostVariables {
    content?: string;
    type?: string;
    parent_id?: string;
}

export function useCreatePost({ screen }: { screen: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content, parent_id, type }: CreatePostVariables) => {
            return api.post("/post", { content, parent_id, type });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [screen] });
        },
        onError: (error) => {
            console.error('Error creating post:', error);
        },
    });
}

export function useDeletePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ post_id }: { post_id: string }) => {
            return api.delete(`/post/${post_id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            console.error('Error deleting post:', error);
        },
    });
}