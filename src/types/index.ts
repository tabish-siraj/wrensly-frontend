export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified?: boolean;
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