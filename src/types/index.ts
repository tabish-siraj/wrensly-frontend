export interface UserProfile {
  id: string | null;
  userId: string | null;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  bio: string | null;
  avatar: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  phone: string | null;
  website: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  isAdmin: boolean;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  Profile: UserProfile | null;
}
export interface Post {
  id: string;
  content: string;
  user: {
    id: string;
    username: string;
    Profile: {
      firstName: string;
      lastName: string;
    }
  };
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
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