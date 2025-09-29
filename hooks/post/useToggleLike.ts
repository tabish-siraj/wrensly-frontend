// hooks/post/useToggleFeather.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Post } from "@/src/types";

interface ToggleLikeVariables {
    postId: string;
    isLiked: boolean;
}

export function useToggleLike() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, isLiked }: ToggleLikeVariables) => {
            if (isLiked) {
                return api.delete(`/api/like/${postId}`);
            } else {
                return api.post('/api/like', {
                    postId,
                    isLiked: true
                });
            }
        },
        onMutate: async ({ postId, isLiked }) => {
            await queryClient.cancelQueries({ queryKey: ["posts"] });

            const prevPosts = queryClient.getQueryData<{ data: Post[] }>(["posts"]);

            queryClient.setQueryData(["posts"], (old: { data: Post[] } | undefined) => {
                if (!old?.data) return old;
                return {
                    ...old,
                    data: old.data.map((post) =>
                        post.id === postId
                            ? {
                                ...post,
                                isLiked: !isLiked,
                                likeCount: post.likeCount + (isLiked ? -1 : 1),
                            }
                            : post
                    ),
                };
            });

            return { prevPosts };
        },
        onError: (error, variables, context) => {
            if (context?.prevPosts) {
                queryClient.setQueryData(["posts"], context.prevPosts);
            }
            console.error('Error toggling like:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
}
