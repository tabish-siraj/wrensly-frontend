// Echo.tsx
"use client";

import { Button } from "@/components/ui/button";
import { RepeatIcon } from "lucide-react";
import usePostStore from "@/src/stores/postStore";

interface EchoProps {
  postId: string;
}

export function Echo({ postId }: EchoProps) {
  const post = usePostStore((state) => state.posts.find((p) => p.id === postId));
  const toggleEcho = usePostStore((state) => state.toggleEcho);

  if (!post) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => toggleEcho(postId)}
      className="flex items-center gap-1 text-gray-500 hover:text-green-500 hover:bg-transparent transition-colors"
    >
      <RepeatIcon className={`${post.isEchoed ? "text-green-500" : "text-gray-500"}`} />
      <span className="text-sm text-gray-700">{post.echoCount}</span>
    </Button>
  );
}
