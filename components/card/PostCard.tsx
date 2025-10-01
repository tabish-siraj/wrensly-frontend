// create a tweet card component

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Repost } from '../repost/Repost';
// import { Spread } from '../spread/Spread';
// import { Bookmark } from '../bookmark/Bookmark';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { EllipsisVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { Post } from '@/src/types';
import { Like } from "@/components/like/Like";
// import usePostStore from '@/src/stores/postStore';

interface PostCardProps {
  post: Post;
  screen: string;
}

export function PostCard({ screen, post }: PostCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow mb-4">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Link href={`/nest/${post.user.username}`}>
              <Avatar className="h-10 w-10">
                <AvatarImage alt="avatar" src="/placeholder.svg" />
                <AvatarFallback>{post.user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
            <span className="font-semibold ml-2">
              <Link href={`/nest/${post.user.username}`}>
                {post.user.username}
              </Link>
            </span>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <EllipsisVertical size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Delete</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-800 mb-4">{post.content}</p>
      </CardContent>
      <div className="px-4 flex justify-between">
        <Like key={post.id} screen={screen} post={post} onSuccess={() => { }} />
        <Repost key={post.id} screen={screen} post={post} />
        {/* <Spread key={post.id} postId={post.id} />
        <Bookmark key={post.id} postId={post.id} /> */}
      </div>
    </Card>
  )
}
