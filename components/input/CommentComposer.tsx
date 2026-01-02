"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon, Smile, Calendar, MapPin } from "lucide-react";
import { useCreateComment } from "@/hooks/comment/useCreateComment";
import { toast } from "sonner";
import { SCREEN } from "@/src/constants";
import { Post } from "@/src/types";

interface CommentComposerProps {
    user: {
        username: string;
        avatar: string | null;
    };
    placeholder?: string;
    onSubmit?: (content: string) => void;
    screen?: string;
    post: Post;
    root_post_id?: string; // Add root post ID for proper cache invalidation
}

export function CommentComposer({
    user,
    placeholder,
    onSubmit,
    screen = SCREEN.FEED,
    post,
    root_post_id,
}: CommentComposerProps) {
    const [content, setContent] = useState("");
    const maxLength = 500;
    const postMutation = useCreateComment({ screen, root_post_id });

    const handleSubmit = () => {
        if (content.trim() !== "") {
            if (onSubmit) {
                // Custom submit handler (for replies)
                onSubmit(content.trim());
                setContent("");
            } else {
                // Default submit handler (for regular comments)
                postMutation.mutate({
                    content: content.trim(),
                    post_id: post.id,
                }, {
                    onSuccess: () => {
                        toast.success("Comment posted!");
                        setContent("");
                    },
                    onError: (error: any) => {
                        toast.error(error.message || "Failed to post comment");
                    }
                });
            }
        }
    };

    return (
        <div className="w-full">
            <div className="flex space-x-3">
                <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.username}
                    />
                    <AvatarFallback className="bg-gray-100 text-gray-600">
                        {user?.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={placeholder}
                        className="min-h-[80px] text-base border-gray-200 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
                        maxLength={maxLength}
                    />

                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-500 hover:bg-blue-50 h-8 w-8 p-0 rounded-full"
                            >
                                <ImageIcon className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-500 hover:bg-blue-50 h-8 w-8 p-0 rounded-full"
                            >
                                <Smile className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex items-center space-x-3">
                            <span
                                className={`text-sm font-medium ${content.length > maxLength * 0.9
                                    ? "text-red-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                {maxLength - content.length}
                            </span>
                            <Button
                                onClick={handleSubmit}
                                disabled={!content.trim() || postMutation.isPending}
                                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full px-6 h-9 font-medium transition-colors"
                            >
                                {postMutation.isPending ? "Posting..." : "Post"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
