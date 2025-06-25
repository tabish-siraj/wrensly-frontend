// create a tweet card component

import React from 'react';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Feather } from '../feather/Feather';
import { Echo } from '../echo/Echo';
import { Spread } from '../spread/Spread';
import { Bookmark } from '../bookmark/Bookmark';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

interface ChirpCardProps {
  username: string;
  content: string;
  isFeathered: boolean;
  featherCount: number;
  isEchoed: boolean;
  echoCount: number;
  isSpread: boolean;
  spreadCount: number;
  isBookmarked: boolean;
  onToggleFeather: () => void;
  onToggleEcho: () => void;
  onToggleSpread: () => void;
  onToggleBookmark: () => void;
}

export function ChirpCard({
  username,
  content,
  isFeathered,
  featherCount,
  isEchoed,
  echoCount,
  isSpread,
  spreadCount,
  isBookmarked,
  onToggleFeather,
  onToggleEcho,
  onToggleSpread,
  onToggleBookmark,
}: ChirpCardProps) {
  return (
    <Card className="p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3 mb-3">
        <CardHeader>
          <Link href={`/nest/${username}`}>
            <Avatar className="h-10 w-10">
              <AvatarImage alt="avatar" src="/placeholder.svg" />
            </Avatar>
          </Link>
        </CardHeader>
        <span className="font-semibold">
          <Link href={`/nest/${username}`}>
            {username}
          </Link>
        </span>
      </div>
      <p className="text-gray-800 mb-4">{content}</p>
      <CardFooter>
        <div className="flex items-center justify-around space-x-4">
          <Feather
            isFeathered={isFeathered}
            count={featherCount}
            onToggleFeather={onToggleFeather}
          />
          <Echo
            isEchoed={isEchoed}
            count={echoCount}
            onToggleEcho={onToggleEcho}
          />
          <Spread
            isSpread={isSpread}
            count={spreadCount}
            onToggleSpread={onToggleSpread}
          />
          <Bookmark
            isBookmarked={isBookmarked}
            onToggleBookmark={onToggleBookmark}
          />
        </div>
      </CardFooter>
    </Card>
  );
}