// PostStore deprecated
// @src/stores/postStore.ts

// import { create } from "zustand";
// import { Post } from "../types";

// interface PostStore {
//     posts: Post[];
//     setPosts: (posts: Post[]) => void;
//     // addComment: (postId: string, comment: { userId: string; text: string }) => void;
//     // removeComment: (postId: string, commentId: string) => void;
//     toggleFeather: (postId: string) => void;
//     toggleRepost: (postId: string) => void;
//     toggleShare: (postId: string) => void;
//     toggleBookmark: (postId: string) => void;
// }

// const usePostStore = create<PostStore>((set) => ({
//     posts: [],
//     setPosts: (posts) => set({ posts }),
//     toggleFeather: (postId) => set((state) => ({
//         posts: state.posts.map((p) =>
//             p.id === postId ? {
//                 ...p,
//                 isFeathered: !p.isFeathered,
//                 featherCount: p.featherCount + (p.isFeathered ? -1 : 1),
//             } : p
//         ),
//     })),
//     toggleRepost: (postId) => set((state) => ({
//         posts: state.posts.map((p) =>
//             p.id === postId ? {
//                 ...p,
//                 isReposted: !p.isReposted,
//                 RepostCount: p.RepostCount + (p.isReposted ? -1 : 1),
//             } : p
//         ),
//     })),
//     toggleShare: (postId) => set((state) => ({
//         posts: state.posts.map((p) =>
//             p.id === postId ? {
//                 ...p,
//                 isShare: !p.isShare,
//                 shareCount: p.shareCount + (p.isShare ? -1 : 1),
//             } : p
//         ),
//     })),
//     toggleBookmark: (postId) => set((state) => ({
//         posts: state.posts.map((p) =>
//             p.id === postId ? {
//                 ...p,
//                 isBookmarked: !p.isBookmarked,
//             } : p
//         ),
//     })),
//     // addComment: (postId, comment) => set((state) => ({
//     //     posts: state.posts.map((p) =>
//     //         p.id === postId ? {
//     //             ...p,
//     //             comments: [...p.comments, comment],
//     //         }
//     //             : p
//     //     ),
//     // })),
//     // removeComment: (postId, commentId) => set((state) => ({
//     //     posts: state.posts.map((p) =>
//     //         p.id === postId ? {
//     //             ...p,
//     //             comments: p.comments.filter((c) => c.id !== commentId),
//     //         }
//     //             : p
//     //     ),
//     // })),
// }))

// export default usePostStore;
