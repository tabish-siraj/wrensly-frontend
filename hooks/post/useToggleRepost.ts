// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "@/lib/api";
// import { Post } from "@/src/types";

// interface ToggleRepostVariables {
//     postId: string;
//     is_reposted: boolean;
//     screen: string;
// }

// export function useToggleRepost() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async ({ postId }: ToggleRepostVariables) => {
//             return api.post("/post/repost", { postId });
//         },
//         onMutate: async ({ postId, is_reposted, screen }) => {
//             const queryKey = [screen];
//             await queryClient.cancelQueries({ queryKey });

//             const previousData = queryClient.getQueryData<{ data: Post[] }>(queryKey);

//             queryClient.setQueryData(queryKey, (old: { data: Post[] } | undefined) => {
//                 if (!old?.data) return old;
//                 return {
//                     ...old,
//                     data: old.data.map((post) =>
//                         post.id === postId
//                             ? {
//                                 ...post,
//                                 is_reposted: !is_reposted,
//                                 stats: {
//                                     ...post.stats,
//                                     reposts: post.stats.reposts + (is_reposted ? -1 : 1),
//                                 }
//                             } : post
//                     ),
//                 };
//             });

//             return { previousData };
//         },
//         onError: (error, variables, context) => {
//             const queryKey = [variables.screen];
//             if (context?.previousData) {
//                 queryClient.setQueryData(queryKey, context.previousData);
//             }
//             console.error('Error toggling repost:', error);
//         },
//         onSettled: (data, error, variables) => {
//             const queryKey = [variables.screen];
//             queryClient.invalidateQueries({ queryKey });
//         },
//     });
// }
