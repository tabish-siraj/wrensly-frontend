export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  isEmailVerified: boolean;
  isAdmin: boolean;
  isBanned: boolean;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  bio: string;
  avatar: string;
  cover: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  website: string;
  followersCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface PostStats {
  likes: number;
  comments: number;
  reposts: number;
}
export interface Post {
  id: string;
  content: string;
  user: Pick<User, "id" | "username" | "firstName" | "lastName" | "avatar">;
  parentId: string | null;
  parent: Post | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isLiked: boolean;
  isReposted: boolean;
  isBookmarked: boolean;
  stats: PostStats;
}

export interface Posts {
  success: boolean;
  message: string;
  data: Post[];
  status: number;
}

export interface TrendingTopic {
  title: string;
  category: string;
  posts: string;
}

