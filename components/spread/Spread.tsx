import React from 'react';
import { Button } from '@/components/ui/button';
import { ShareIcon } from 'lucide-react';
import usePostStore from "@/src/stores/postStore";
interface SpreadProps {
  postId: string;
}

export function Spread({ postId }: SpreadProps) {
  const post = usePostStore((state) => state.posts.find((p) => p.id === postId));
  const toggleSpread = usePostStore((state) => state.toggleSpread);
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => toggleSpread(postId)}
      className="text-gray-500 hover:text-blue-500 hover:bg-transparent transition-colors"
    >
      <ShareIcon
        className={`${post?.isSpread ? 'text-blue-500' : 'text-gray-500'}`}
      />
      {(
        <span className="text-sm text-gray-700">{post?.spreadCount}</span>
      )}
    </Button>
  );
}