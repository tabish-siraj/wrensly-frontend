// creating a bookmark component

import React from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkIcon } from 'lucide-react';
import usePostStore from '@/src/stores/postStore';
interface BookmarkProps {
  postId: string;
}

export function Bookmark({ postId }: BookmarkProps) {
  const post = usePostStore((state) => state.posts.find((post) => post.id === postId));
  const toggleBookmark = usePostStore((state) => state.toggleBookmark);

  if (!post) return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => toggleBookmark(postId)}
      className="text-gray-500 hover:text-blue-500 transition-colors"
    >
      <BookmarkIcon
        className={`${post.isBookmarked ? 'text-blue-500' : 'text-gray-500'}`}
      />
    </Button>
  );
}