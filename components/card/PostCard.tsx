// Post Card Component

import React from 'react';
import Link from 'next/link';

import { EllipsisVertical } from 'lucide-react';

import { Post } from '@/src/types';

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Like } from "@/components/like/Like";
import { Repost } from '@/components/repost/Repost';
import { Share } from '@/components/share/Share';
import { Bookmark } from '@/components/bookmark/Bookmark';

interface PostCardProps {
  post: Post;
  screen: string;
}

export function PostCard({ screen, post }: PostCardProps) {
  const isReposted = post.parentId !== null && post.parentId !== "";
  const parentPost = isReposted ? post.parent : null;
  console.log("isReposted:", isReposted);
  console.log("parentPost:", parentPost);
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
        {isReposted && parentPost && (
          <div className="border border-gray-200 rounded-lg p-2 bg-gray-50">
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Link href={`/nest/${parentPost.user.username}`}>
                    <Avatar className="h-10 w-10">
                      <AvatarImage alt="avatar" src="/placeholder.svg" />
                      <AvatarFallback>{parentPost.user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <span className="font-semibold ml-2">
                    <Link href={`/nest/${parentPost.user.username}`}>
                      {parentPost.user.username}
                    </Link>
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">{parentPost.content}</p>
              <p className="text-gray-500 text-xs mt-4">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
            </CardContent>
          </div>
        )}
        {isReposted && !parentPost && (
          <CardContent className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800 italic text-center">Reposted by {post.user.username}</p>
          </CardContent>
        )}
        <p className="text-gray-500 text-xs mt-2">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
      </CardContent>
      <div className="px-4 flex justify-between">
        <Like screen={screen} post={post} />
        <Repost screen={screen} post={post} />
        <Share screen={screen} post={post} />
        <Bookmark screen={screen} post={post} />
      </div>
    </Card>
  )
}
