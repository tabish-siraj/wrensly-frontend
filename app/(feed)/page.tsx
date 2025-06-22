"use client";

import { useState } from "react";

import { NavigationTabs } from "@/components/navigation/NavigationTabs";
import { TrendingTopic, Tweet, User } from "@/src/types";
import { TweetComposer } from "@/components/input/TweetComposer";
import { TweetCard } from "@/components/card/TweetCard";
import { TrendingSidebar } from "@/components/navigation/TrendingSidebar";

// Mock data
const currentUser: User = {
  id: "1",
  username: "johndoe",
  displayName: "John Doe",
  avatar: "/placeholder.svg?height=40&width=40",
};

const mockTweets: Tweet[] = [
  {
    id: "1",
    user: {
      id: "2",
      username: "elonmusk",
      displayName: "Elon Musk",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "Just had a great meeting about the future of sustainable transport. Exciting times ahead! 🚀",
    timestamp: "2024-01-15T10:30:00Z",
    likes: 15420,
    retweets: 3240,
    replies: 892,
    isLiked: false,
    isRetweeted: false,
  },
  {
    id: "2",
    user: {
      id: "3",
      username: "vercel",
      displayName: "Vercel",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "Ship faster with v0 ⚡️\n\nGenerate UI components with AI and deploy instantly to the edge.",
    timestamp: "2024-01-15T09:15:00Z",
    likes: 2340,
    retweets: 567,
    replies: 123,
    image: "/placeholder.svg?height=300&width=500",
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: "3",
    user: {
      id: "4",
      username: "openai",
      displayName: "OpenAI",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "We're excited to announce new improvements to GPT-4 that make it even more helpful and accurate. Thank you to our community for the continued feedback!",
    timestamp: "2024-01-15T08:45:00Z",
    likes: 8920,
    retweets: 1840,
    replies: 445,
    isLiked: false,
    isRetweeted: true,
  },
];

const trendingTopics: TrendingTopic[] = [
  {
    category: "Technology",
    title: "Artificial Intelligence",
    posts: "125K",
  },
  {
    category: "Sports",
    title: "World Cup 2024",
    posts: "89.2K",
  },
  {
    category: "Entertainment",
    title: "New Movie Release",
    posts: "45.8K",
  },
];

const whoToFollow = [
  {
    id: "5",
    username: "github",
    displayName: "GitHub",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
  {
    id: "6",
    username: "reactjs",
    displayName: "React",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
];

export default function XFeedPage() {
  const [activeTab, setActiveTab] = useState("for-you");
  const [tweets, setTweets] = useState(mockTweets);

  const handleNewTweet = (content: string) => {
    const newTweet: Tweet = {
      id: Date.now().toString(),
      user: currentUser,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      retweets: 0,
      replies: 0,
      isLiked: false,
      isRetweeted: false,
    };
    setTweets([newTweet, ...tweets]);
  };

  const handleLike = (tweetId: string) => {
    setTweets(
      tweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              isLiked: !tweet.isLiked,
              likes: tweet.isLiked ? tweet.likes - 1 : tweet.likes + 1,
            }
          : tweet
      )
    );
  };

  const handleRetweet = (tweetId: string) => {
    setTweets(
      tweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              isRetweeted: !tweet.isRetweeted,
              retweets: tweet.isRetweeted
                ? tweet.retweets - 1
                : tweet.retweets + 1,
            }
          : tweet
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto flex">
        {/* Main Content */}
        <main className="flex-1 max-w-2xl border-x border-gray-200">
          <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <TweetComposer user={currentUser} onTweet={handleNewTweet} />

          <div>
            {tweets.map((tweet) => (
              <TweetCard
                key={tweet.id}
                tweet={tweet}
                onLike={handleLike}
                onRetweet={handleRetweet}
                onReply={(id) => console.log("Reply to:", id)}
                onShare={(id) => console.log("Share:", id)}
              />
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block w-80 p-4">
          <TrendingSidebar trends={trendingTopics} whoToFollow={whoToFollow} />
        </aside>
      </div>
    </div>
  );
}
