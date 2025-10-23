"use client";

import { Post } from "@/src/types";
import { Like } from "@/components/like/Like";
import { Repost } from "@/components/repost/Repost";
import { Share } from "@/components/share/Share";
import { Bookmark } from "@/components/bookmark/Bookmark";

interface PostActionsProps {
    post: Post;
    screen: string;
}

export function PostActions({ screen, post }: PostActionsProps) {
    return (
        <div className="px-4 py-2 flex justify-around mt-2 border-t border-b">
            <Like screen={screen} post={post} />
            <Repost screen={screen} post={post} />
            <Share post={post} />
            <Bookmark screen={screen} post={post} />
        </div>
    );
}
