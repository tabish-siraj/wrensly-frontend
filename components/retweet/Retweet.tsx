// create a repost component that displays a retweet icon and a count of retweets

import React from 'react';
import { Button } from '@/components/ui/button';
import { RepeatIcon } from 'lucide-react';

interface RetweetProps {
  isRetweeted: boolean;
  count: number;
  onToggleRetweet: () => void;
}

export function Retweet({ isRetweeted, count, onToggleRetweet }: RetweetProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggleRetweet}
      className="text-gray-500 hover:text-green-500 transition-colors"
    >
      <RepeatIcon
        className={`h-5 w-5 ${isRetweeted ? 'text-green-500' : 'text-gray-500'}`}
      />
      {count > 0 && (
        <span className="ml-2 text-sm text-gray-700">{count}</span>
      )}
    </Button>
  );
}