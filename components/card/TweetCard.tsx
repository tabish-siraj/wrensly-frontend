"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
import { Tweet } from "@/src/types";

interface TweetCardProps {
  tweet: Tweet;
  onLike?: (tweetId: string) => void;
  onRetweet?: (tweetId: string) => void;
  onReply?: (tweetId: string) => void;
  onShare?: (tweetId: string) => void;
}

export function TweetCard({
  tweet,
  onLike,
  onRetweet,
  onReply,
  onShare,
}: TweetCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return `${Math.floor(diff / (1000 * 60))}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString();
  };

  return (
    <article className="border-b border-gray-200 p-4 hover:bg-gray-50/50 transition-colors">
      <div className="flex space-x-3">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={tweet.user.avatar || "/placeholder.svg"}
            alt={tweet.user.displayName}
          />
          <AvatarFallback>{tweet.user.displayName[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {/* User info */}
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-bold text-gray-900 truncate">
              {tweet.user.displayName}
            </h3>
            {tweet.user.verified && (
              <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
            )}
            <span className="text-gray-500 truncate">
              @{tweet.user.username}
            </span>
            <span className="text-gray-500">·</span>
            <time className="text-gray-500 flex-shrink-0">
              {formatTime(tweet.timestamp)}
            </time>
            <Button variant="ghost" size="icon" className="ml-auto w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Tweet content */}
          <div className="mb-3">
            <p className="text-gray-900 whitespace-pre-wrap">{tweet.content}</p>
            {tweet.image && (
              <div className="mt-3 rounded-2xl overflow-hidden">
                <Image
                  src={tweet.image || "/placeholder.svg"}
                  alt="Tweet image"
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>

          {/* Engagement buttons */}
          <div className="flex items-center justify-between max-w-md">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 -ml-2"
              onClick={() => onReply?.(tweet.id)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">{formatNumber(tweet.replies)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`hover:bg-green-50 -ml-2 ${
                tweet.isRetweeted
                  ? "text-green-500"
                  : "text-gray-500 hover:text-green-500"
              }`}
              onClick={() => onRetweet?.(tweet.id)}
            >
              <Repeat2 className="w-4 h-4 mr-2" />
              <span className="text-sm">{formatNumber(tweet.retweets)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`hover:bg-red-50 -ml-2 ${
                tweet.isLiked
                  ? "text-red-500"
                  : "text-gray-500 hover:text-red-500"
              }`}
              onClick={() => onLike?.(tweet.id)}
            >
              <Heart
                className={`w-4 h-4 mr-2 ${
                  tweet.isLiked ? "fill-current" : ""
                }`}
              />
              <span className="text-sm">{formatNumber(tweet.likes)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 -ml-2"
              onClick={() => onShare?.(tweet.id)}
            >
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
