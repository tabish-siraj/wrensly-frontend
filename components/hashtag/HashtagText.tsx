"use client";

import { useRouter } from "next/navigation";
import { renderContentWithHashtags } from "@/lib/hashtags";

interface HashtagTextProps {
    content: string;
    className?: string;
}

export function HashtagText({ content, className = "" }: HashtagTextProps) {
    const router = useRouter();

    const handleHashtagClick = (hashtag: string) => {
        router.push(`/hashtag/${hashtag}`);
    };

    return (
        <div className={`whitespace-pre-line ${className}`}>
            {renderContentWithHashtags(content, handleHashtagClick)}
        </div>
    );
}