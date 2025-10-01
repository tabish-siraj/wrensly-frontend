// creating a bookmark component

import React from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkIcon } from 'lucide-react';
import { Post } from '@/src/types';
interface BookmarkProps {
  screen: string;
  post: Post;
  // onSuccess?: () => void; // Uncomment if you want to handle success callbacks
}

export function Bookmark({ screen, post }: BookmarkProps) {
  console.log(screen);
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => { }}
      className="text-gray-500 hover:text-blue-500 transition-colors"
    >
      <BookmarkIcon
        className={`${post.isBookmarked ? 'text-blue-500' : 'text-gray-500'}`}
      />
    </Button>
  );
}