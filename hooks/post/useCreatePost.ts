import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

interface CreatePostVariables {
    content: string;
    parentId?: string; // For quoted reposts
}

export function useCreatePost({ screen }: { screen: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content, parentId }: CreatePostVariables) => {
            return api.post("/post", { content, parentId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [screen] });
        },
        onError: (error) => {
            console.error('Error creating post:', error);
        },
    });
}
