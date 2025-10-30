"use client";

import { Post } from "@/src/types";
import { Like } from "@/components/like/Like";
import { Repost } from "@/components/repost/Repost";
import { Comment } from "@/components/comment/Comment";
import { Share } from "@/components/share/Share";
import { Bookmark } from "@/components/bookmark/Bookmark";

interface PostActionsProps {
    post: Post;
    screen: string;
    onCommentClick: () => void;
}

export function PostActions({ screen, post, onCommentClick }: PostActionsProps) {
    return (
        <div className="py-2 flex justify-around border-t border-b">
            <Like screen={screen} post={post} />
            <Comment post={post} onClick={onCommentClick} />
            <Repost screen={screen} post={post} />
            <Share post={post} />
            <Bookmark screen={screen} post={post} />
        </div>
    );
}
