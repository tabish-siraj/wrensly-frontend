// @src/stores/postStore.ts

import { create } from "zustand";
import { PostWithInteractions } from "../types";

interface PostStore {
    posts: PostWithInteractions[];
    setPosts: (posts: PostWithInteractions[]) => void;
    // addComment: (postId: string, comment: { userId: string; text: string }) => void;
    // removeComment: (postId: string, commentId: string) => void;
    toggleFeather: (postId: string) => void;
    toggleEcho: (postId: string) => void;
    toggleSpread: (postId: string) => void;
    toggleBookmark: (postId: string) => void;
}

const usePostStore = create<PostStore>((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
    toggleFeather: (postId) => set((state) => ({
        posts: state.posts.map((p) =>
            p.id === postId ? {
                ...p,
                isFeathered: !p.isFeathered,
                featherCount: p.featherCount + (p.isFeathered ? -1 : 1),
            } : p
        ),
    })),
    toggleEcho: (postId) => set((state) => ({
        posts: state.posts.map((p) =>
            p.id === postId ? {
                ...p,
                isEchoed: !p.isEchoed,
                echoCount: p.echoCount + (p.isEchoed ? -1 : 1),
            } : p
        ),
    })),
    toggleSpread: (postId) => set((state) => ({
        posts: state.posts.map((p) =>
            p.id === postId ? {
                ...p,
                isSpread: !p.isSpread,
                spreadCount: p.spreadCount + (p.isSpread ? -1 : 1),
            } : p
        ),
    })),
    toggleBookmark: (postId) => set((state) => ({
        posts: state.posts.map((p) =>
            p.id === postId ? {
                ...p,
                isBookmarked: !p.isBookmarked,
            } : p
        ),
    })),
    // addComment: (postId, comment) => set((state) => ({
    //     posts: state.posts.map((p) =>
    //         p.id === postId ? {
    //             ...p,
    //             comments: [...p.comments, comment],
    //         }
    //             : p
    //     ),
    // })),
    // removeComment: (postId, commentId) => set((state) => ({
    //     posts: state.posts.map((p) =>
    //         p.id === postId ? {
    //             ...p,
    //             comments: p.comments.filter((c) => c.id !== commentId),
    //         }
    //             : p
    //     ),
    // })),
}))

export default usePostStore;
