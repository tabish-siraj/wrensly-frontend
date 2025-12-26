import { useState } from "react";
import Link from 'next/link';

import { Post } from '@/src/types';
import { POST_TYPE } from '@/src/constants';

import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { PostHeader } from "./PostHeader";
import { ParentPostCard } from "./ParentPostCard";
import { PostActions } from "./PostActions";
import { CommentComposer } from "@/components/input/CommentComposer";
import useUserStore from "@/src/stores/userStore";
import { useCreateComment } from "@/hooks/comment/useCreateComment";
import { toast } from "sonner";
import { RepeatIcon } from "lucide-react";

interface PostCardProps {
  post: Post;
  screen: string;
}

export function PostCard({ screen, post }: PostCardProps) {
  // Safety checks
  if (!post) {
    console.error('PostCard: post is null or undefined');
    return null;
  }

  if (!post.user) {
    console.error('PostCard: post.user is null or undefined', post);
    return null;
  }

  try {
    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              {post.user.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="ml-3">
              <span className="font-bold text-lg">
                {post.user.first_name} {post.user.last_name}
              </span>
              <p className="text-sm text-gray-500">@{post.user.username}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800 mb-4 whitespace-pre-line">{post.content}</p>
          <div className="text-sm text-gray-500">
            <span>{new Date(post.created_at).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error('Error rendering PostCard:', error, post);
    return (
      <Card className="shadow-md">
        <CardContent className="p-4">
          <div className="text-red-500">Error loading post</div>
          <pre className="text-xs mt-2">{JSON.stringify(error, null, 2)}</pre>
        </CardContent>
      </Card>
    );
  }
}
