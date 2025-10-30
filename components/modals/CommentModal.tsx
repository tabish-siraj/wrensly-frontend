"use client";

import { Post } from "@/src/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PostComposer } from "@/components/input/PostComposer";
import { useCreatePost } from "@/hooks/post/useCreatePost";
import { toast } from "sonner";
import { SCREEN } from "@/src/constants";
import useUserStore from "@/src/stores/userStore";

interface CommentModalProps {
    post: Post;
    isOpen: boolean;
    onClose: () => void;
}

export function CommentModal({ post, isOpen, onClose }: CommentModalProps) {
    const { user } = useUserStore();
    const postMutation = useCreatePost({ screen: SCREEN.POST });

    const handleSubmit = (content: string) => {
        postMutation.mutate({
            content: content.trim(),
            parentId: post.id,
        }, {
            onSuccess: () => {
                toast.success("Your comment has been posted.");
                onClose();
            },
            onError: (error) => {
                toast.error("Failed to post your comment.");
                console.error(error);
            }
        });
    };

    if (!user) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Post a comment</DialogTitle>
                </DialogHeader>
                <PostComposer
                    user={user}
                    placeholder="Post your comment..."
                    onSubmit={handleSubmit}
                    screen={SCREEN.POST}
                />
            </DialogContent>
        </Dialog>
    );
}
