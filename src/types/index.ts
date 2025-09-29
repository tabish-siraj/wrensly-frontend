export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  isVerified: boolean;
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
export interface Post {
  id: string;
  content: string;
  user: Pick<User, "id" | "username" | "firstName" | "lastName" | "avatar">;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isLiked: boolean;
  likeCount: number;
  isEchoed: boolean;
  echoCount: number;
  isSpread: boolean;
  spreadCount: number;
  isBookmarked: boolean;
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

// This is what your UI components expect
export interface PostWithInteractions extends Post {
  isLiked: boolean;
  likeCount: number;
  isEchoed: boolean;
  echoCount: number;
  isSpread: boolean;
  spreadCount: number;
  isBookmarked: boolean;
}