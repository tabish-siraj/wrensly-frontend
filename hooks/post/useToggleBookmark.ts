// hooks/post/useToggleBookmark.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Post } from "@/src/types";

interface ToggleBookmarkVariables {
    postId: string;
    is_bookmarked: boolean;
    screen: string;
}

export function useToggleBookmark() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, is_bookmarked }: ToggleBookmarkVariables) => {
            if (is_bookmarked) {
                return api.delete(`/bookmark/${postId}`);
            } else {
                return api.post('/bookmark', {
                    postId,
                    is_bookmarked: true
                });
            }
        },
        onMutate: async ({ postId, is_bookmarked, screen }) => {
            const queryKey = [screen];
            await queryClient.cancelQueries({ queryKey });

            const previousData = queryClient.getQueryData<{ data: Post[] }>(queryKey);

            queryClient.setQueryData(queryKey, (old: { data: Post[] } | undefined) => {
                if (!old?.data) return old;
                return {
                    ...old,
                    data: old.data.map((post) =>
                        post.id === postId
                            ? {
                                ...post,
                                is_bookmarked: !is_bookmarked,
                            } : post
                    ),
                };
            });

            return { previousData };
        },
        onError: (error, variables, context) => {
            const queryKey = [variables.screen];
            if (context?.previousData) {
                queryClient.setQueryData(queryKey, context.previousData);
            }
            console.error('Error toggling bookmark:', error);
        },
        onSettled: (data, error, variables) => {
            const queryKey = [variables.screen];
            queryClient.invalidateQueries({ queryKey });
        },
    });
}
