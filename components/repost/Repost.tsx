// Repost.tsx
"use client";

import { Button } from "@/components/ui/button";
import { RepeatIcon } from "lucide-react";
import { Post } from "@/src/types";
import { SCREEN } from "@/src/constants";

interface RepostProps {
  screen: string;
  post: Post;
  // onSuccess?: () => void; // Uncomment if you want to handle success callbacks
}

export function Repost({ screen, post }: RepostProps) {

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => { }}
      className="flex items-center gap-1 text-gray-500 hover:text-green-500 hover:bg-transparent transition-colors"
    >
      <RepeatIcon className={`${post.isReposted ? "text-green-500" : "text-gray-500"}`} />
      <span className="text-sm text-gray-700">{post.stats.reposts}</span>
    </Button>
  );
}
