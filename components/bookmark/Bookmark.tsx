// creating a bookmark component

import React from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkIcon } from 'lucide-react';
import { Post } from '@/src/types';
import { useToggleBookmark } from '@/hooks/post/useToggleBookmark';
import { toast } from 'sonner';

interface BookmarkProps {
  screen: string;
  post: Post;
  // onSuccess?: () => void; // Uncomment if you want to handle success callbacks
}

export function Bookmark({ screen, post }: BookmarkProps) {
  const toggleBookmark = useToggleBookmark();

  const handleBookmarkToggle = () => {
    toggleBookmark.mutate(
      {
        screen: screen,
        postId: post.id,
        is_bookmarked: post.is_bookmarked,
      },
      {
        onError: (error) => {
          toast.error("Failed to bookmark.");
          if (process.env.NODE_ENV === 'development') {
            console.error(error);
          }
        },
        onSuccess: () => {
          toast.success("Post bookmarked.");
        },
      }
    );
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => handleBookmarkToggle()}
      disabled={toggleBookmark.isPending}
      className="text-gray-500 hover:text-blue-500 transition-colors"
    >
      <BookmarkIcon
        className={`${post.is_bookmarked ? "text-blue-500 fill-blue-500" : "text-gray-500"
          } ${toggleBookmark.isPending ? "opacity-50" : ""}`}
      />
    </Button>
  );
}