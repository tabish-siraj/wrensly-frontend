import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export function useCreatePost({ screen }: { screen: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content }: { content: string }) => {
            const response = await api.post("/post", { content });

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to create post");
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [screen] });
            queryClient.invalidateQueries({ queryKey: ["infinite-feed"] });
        },
        onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error creating post:', error);
            }
        },
    });
}

export function useDeletePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ post_id }: { post_id: string }) => {
            const response = await api.delete(`/post/${post_id}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to delete post");
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error deleting post:', error);
            }
        },
    });
}