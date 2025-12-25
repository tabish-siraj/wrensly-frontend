export interface User {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  is_email_verified: boolean;
  is_admin: boolean;
  is_banned: boolean;
  first_name: string;
  last_name: string;
  date_of_birth: string; // Changed from Date to string as APIs typically return ISO strings
  gender: string;
  bio: string;
  avatar: string;
  cover: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  website: string;
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PostStats {
  likes: number;
  comments: number;
  reposts: number;
}
export interface Post {
  id: string;
  content: string;
  type: string; // POST, REPOST, QUOTE, COMMENT
  user: Pick<User, "id" | "username" | "first_name" | "last_name" | "avatar">;
  parent_id: string | null;
  parent: Post | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_liked: boolean;
  is_reposted: boolean;
  is_bookmarked: boolean;
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
