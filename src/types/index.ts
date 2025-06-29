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
  dateOfBirth: string;
  gender: string;
  bio: string;
  avatar: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
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