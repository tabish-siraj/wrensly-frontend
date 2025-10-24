// components/card/PostCard.tsx


import Link from 'next/link';

import { Post } from '@/src/types';

import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { PostHeader } from "./PostHeader";
import { ParentPostCard } from "./ParentPostCard";
import { PostActions } from "./PostActions";

interface PostCardProps {
  post: Post;
  screen: string;
}

export function PostCard({ screen, post }: PostCardProps) {
  const isReposted = post.parentId !== null && post.parentId !== "";
  const parentPost = isReposted ? post.parent : null;
  const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const postTime = new Date(post.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <PostHeader user={post.user} />
      </CardHeader>
      <CardContent>
        <Link href={`/post/${post.id}`}>
          <p className="text-gray-800 mb-4">{post.content}</p>
        </Link>
        {isReposted && parentPost && (
          <ParentPostCard post={parentPost} />
        )}
        <div className="text-sm text-gray-500">
          <span>{postTime} &middot; {postDate}</span>
        </div>
      </CardContent>
      <PostActions screen={screen} post={post} />
    </Card>
  )
}
