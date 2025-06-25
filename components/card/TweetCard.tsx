// create a tweet card component

import React from 'react';
import { Card } from '@/components/ui/card';
import { Ribbon } from '@/components/ribbon/Ribbon';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

interface TweetCardProps {
  username: string;
  content: string;
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

export function TweetCard({
  username,
  content,
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
}: TweetCardProps) {
  return (
    <Card className="p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3 mb-3">
        <Link href="/">
          <Avatar className="h-10 w-10">
            <AvatarImage alt="avatar" src="/placeholder.svg" />
          </Avatar>
        </Link>
        <span className="font-semibold">
          <Link href="/">
            {username}
          </Link>
        </span>
      </div>
      <p className="text-gray-800 mb-4">{content}</p>
      <Ribbon
        isLiked={isLiked}
        likeCount={likeCount}
        isRetweeted={isRetweeted}
        retweetCount={retweetCount}
        isShared={isShared}
        shareCount={shareCount}
        isBookmarked={isBookmarked}
        onToggleLike={onToggleLike}
        onToggleRetweet={onToggleRetweet}
        onToggleShare={onToggleShare}
        onToggleBookmark={onToggleBookmark}
      />
    </Card>
  );
}