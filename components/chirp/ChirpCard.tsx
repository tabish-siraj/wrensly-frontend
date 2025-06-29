// create a tweet card component

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Feather } from '../feather/Feather';
import { Echo } from '../echo/Echo';
import { Spread } from '../spread/Spread';
import { Bookmark } from '../bookmark/Bookmark';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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
    <Card className="shadow-md hover:shadow-lg transition-shadow mb-4">
      <CardHeader>
        <div className="flex items-center">
          <Link href={`/nest/${username}`}>
            <Avatar className="h-10 w-10">
              <AvatarImage alt="avatar" src="/placeholder.svg" />
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
          <span className="font-semibold ml-2">
            <Link href={`/nest/${username}`}>
              {username}
            </Link>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-800 mb-4">{content}</p>
      </CardContent>
      {/* <CardFooter> */}
      <div className="px-6 flex justify-between">
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
      {/* </CardFooter> */}
    </Card>
  );
}