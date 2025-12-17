import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

interface CreatePostVariables {
    content?: string;
    type?: string;
    parentId?: string;
}

export function useCreatePost({ screen }: { screen: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content, type, parentId }: CreatePostVariables) => {
            return api.post("/post", { content, type, parentId });
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
        mutationFn: async ({ postId }: { postId: string }) => {
            return api.delete(`/post/${postId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            console.error('Error deleting post:', error);
        },
    });
}