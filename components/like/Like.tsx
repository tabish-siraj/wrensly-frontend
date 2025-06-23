// create a Like component that displays a heart icon and a count of likes

import React from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";

interface LikeProps {
    isLiked: boolean;
    count: number;
    onToggleLike: () => void;
}

export function Like({ isLiked, count, onToggleLike }: LikeProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onToggleLike}
            className="text-gray-500 hover:text-red-500 transition-colors"
        >
            <HeartIcon
                className={`h-5 w-5 ${isLiked ? "text-red-500" : "text-gray-500"}`}
            />
            {count > 0 && (
                <span className="ml-2 text-sm text-gray-700">{count}</span>
            )}
        </Button>
    );
}