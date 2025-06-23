// create a ribbon component that displays like, retweet, share, and bookmark components
// and allows users to interact with them

import React from 'react';
import { Button } from '@/components/ui/button';
import { Like } from '../like/Like';
import { Retweet } from '../retweet/Retweet';
import { Share } from '../share/Share';
import { Bookmark } from '../bookmark/Bookmark';

interface RibbonProps {
  isLiked: boolean;
  likeCount: number;
  isRetweeted: boolean;
  retweetCount: number;
  isShared: boolean;
  shareCount: number;
  isBookmarked: boolean;
  onToggleLike: () => void;
  onToggleRetweet: () => void;
  onToggleShare: () => void;
  onToggleBookmark: () => void;
}

export function Ribbon({
  isLiked,
  likeCount,
  isRetweeted,
  retweetCount,
  isShared,
  shareCount,
  isBookmarked,
  onToggleLike,
  onToggleRetweet,
  onToggleShare,
  onToggleBookmark,
}: RibbonProps) {
  return (
    <div className="flex items-center justify-around space-x-4">
      <Like
        isLiked={isLiked}
        count={likeCount}
        onToggleLike={onToggleLike}
      />
      <Retweet
        isRetweeted={isRetweeted}
        count={retweetCount}
        onToggleRetweet={onToggleRetweet}
      />
      <Share
        isShared={isShared}
        count={shareCount}
        onToggleShare={onToggleShare}
      />
      <Bookmark
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
      />
    </div>
  );
}