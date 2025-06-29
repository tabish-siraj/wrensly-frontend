// creating a bookmark component

import React from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkIcon } from 'lucide-react';

interface BookmarkProps {
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export function Bookmark({ isBookmarked, onToggleBookmark }: BookmarkProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggleBookmark}
      className="text-gray-500 hover:text-blue-500 transition-colors"
    >
      <BookmarkIcon
        className={`${isBookmarked ? 'text-blue-500' : 'text-gray-500'}`}
      />
    </Button>
  );
}