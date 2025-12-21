// hooks/post/useToggleLike.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Post } from "@/src/types";

interface ToggleLikeVariables {
    postId: string;
    is_liked: boolean;
    screen: string;
}

export function useToggleLike() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, is_liked }: ToggleLikeVariables) => {
            if (is_liked) {
                return api.delete(`/like/${postId}`);
            } else {
                return api.post('/like', {
                    postId,
                    is_liked: true
                });
            }
        },
        onMutate: async ({ postId, is_liked, screen }) => {
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
                                is_liked: !is_liked,
                                stats: {
                                    ...post.stats,
                                    likes: post.stats.likes + (is_liked ? -1 : 1),
                                }
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
            console.error('Error toggling like:', error);
        },
        onSettled: (data, error, variables) => {
            const queryKey = [variables.screen];
            queryClient.invalidateQueries({ queryKey });
        },
    });
}
