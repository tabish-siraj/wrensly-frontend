export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified?: boolean;
}

export interface Tweet {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  image?: string;
  isLiked?: boolean;
  isRetweeted?: boolean;
}

export interface TrendingTopic {
  category: string;
  title: string;
  posts: string;
}
