// hooks/post/useToggleFeather.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api"; // your axios instance

export function useToggleLike() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, isFeathered }: { postId: string; isFeathered: boolean }) => {
            if (isFeathered) {
                return api.delete(`/post/${postId}/feather`);
            } else {
                return api.post(`/post/${postId}/feather`);
            }
        },
        onMutate: async ({ postId, isFeathered }) => {
            await queryClient.cancelQueries({ queryKey: ["posts"] });

            const prevPosts = queryClient.getQueryData<any>(["posts"]);

            queryClient.setQueryData(["posts"], (old: any) => {
                if (!old?.data) return old;
                return {
                    ...old,
                    data: old.data.map((p: any) =>
                        p.id === postId
                            ? {
                                ...p,
                                isFeathered: !isFeathered,
                                featherCount: p.featherCount + (isFeathered ? -1 : 1),
                            }
                            : p
                    ),
                };
            });

            return { prevPosts };
        },
        onError: (_err, _variables, context) => {
            if (context?.prevPosts) {
                queryClient.setQueryData(["posts"], context.prevPosts);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
}
