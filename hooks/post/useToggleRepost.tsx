import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Post } from "@/src/types";

interface ToggleRepostVariables {
    postId: string;
    isReposted: boolean;
    screen: string;
    content?: string;
}

export function useToggleRepost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, isReposted, content }: ToggleRepostVariables) => {
            if (isReposted) {
                return api.delete(`/post/${postId}/repost`);
            } else {
                return api.post("/post", { parentId: postId, content });
            }
        },
        onMutate: async ({ postId, isReposted, screen }) => {
            const queryKey = [screen];
            await queryClient.cancelQueries({ queryKey });

            const previousData = queryClient.getQueryData<{ pages: { data: Post[] }[] }>(queryKey);

            queryClient.setQueryData(queryKey, (old: { pages: { data: Post[] }[] } | undefined) => {
                if (!old) return old;
                return {
                    ...old,
                    pages: old.pages.map(page => ({
                        ...page,
                        data: page.data.map((post) =>
                            post.id === postId
                                ? {
                                    ...post,
                                    isReposted: !isReposted,
                                    stats: {
                                        ...post.stats,
                                        reposts: isReposted ? post.stats.reposts - 1 : post.stats.reposts + 1,
                                    }
                                } : post
                        ),
                    })),
                };
            });

            return { previousData };
        },
        onError: (error, variables, context) => {
            const queryKey = [variables.screen];
            if (context?.previousData) {
                queryClient.setQueryData(queryKey, context.previousData);
            }
            console.error('Error toggling repost:', error);
        },
        onSettled: (data, error, variables) => {
            const queryKey = [variables.screen];
            queryClient.invalidateQueries({ queryKey });
        },
    });
}
