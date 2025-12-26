// hooks/post/useToggleLike.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Post } from "@/src/types";
import { toast } from "sonner";

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
                const response = await api.delete(`/like/${postId}`);
                if (!response.data.success) {
                    throw new Error(response.data.message || "Failed to unlike post");
                }
                return response.data;
            } else {
                const response = await api.post('/like', { post_id: postId });
                if (!response.data.success) {
                    throw new Error(response.data.message || "Failed to like post");
                }
                return response.data;
            }
        },
        onMutate: async ({ postId, is_liked, screen }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: [screen] });
            await queryClient.cancelQueries({ queryKey: ["infinite-feed"] });

            // Snapshot the previous values
            const previousFeedData = queryClient.getQueryData([screen]);
            const previousInfiniteFeedData = queryClient.getQueryData(["infinite-feed"]);

            // Optimistically update regular feed
            queryClient.setQueryData([screen], (old: { data: Post[] } | undefined) => {
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

            // Optimistically update infinite feed
            queryClient.setQueryData(["infinite-feed"], (old: any) => {
                if (!old?.pages) return old;
                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        data: page.data.map((post: Post) =>
                            post.id === postId
                                ? {
                                    ...post,
                                    is_liked: !is_liked,
                                    stats: {
                                        ...post.stats,
                                        likes: post.stats.likes + (is_liked ? -1 : 1),
                                    }
                                } : post
                        )
                    }))
                };
            });

            return { previousFeedData, previousInfiniteFeedData };
        },
        onError: (error, variables, context) => {
            // Rollback optimistic updates on error
            if (context?.previousFeedData) {
                queryClient.setQueryData([variables.screen], context.previousFeedData);
            }
            if (context?.previousInfiniteFeedData) {
                queryClient.setQueryData(["infinite-feed"], context.previousInfiniteFeedData);
            }

            toast.error("Failed to update like. Please try again.");

            if (process.env.NODE_ENV === 'development') {
                console.error('Error toggling like:', error);
            }
        },
        onSettled: (data, error, variables) => {
            // Always refetch after error or success to ensure consistency
            queryClient.invalidateQueries({ queryKey: [variables.screen] });
            queryClient.invalidateQueries({ queryKey: ["infinite-feed"] });
        },
    });
}
