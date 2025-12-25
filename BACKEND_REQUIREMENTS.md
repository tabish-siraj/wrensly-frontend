# Backend Requirements for Wrensly - ExpressJS + Prisma + PostgreSQL

## 🎯 **CRITICAL ISSUES TO FIX**

### 1. **API Response Standardization** ⚠️ HIGH PRIORITY

**Current Issue**: Inconsistent response formats across endpoints  
**Required**: Standardized response wrapper for all endpoints

```typescript
// Required response format for ALL endpoints
interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    pagination?: PaginationMeta;
    timestamp: string;
  };
}

interface PaginationMeta {
  cursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount?: number; // Optional for performance
}

// Example responses
// Success
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": [...],
  "meta": {
    "pagination": {
      "cursor": "eyJpZCI6IjEyMyJ9",
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "timestamp": "2024-12-25T10:30:00Z"
  }
}

// Error
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

---

### 2. **Cursor-Based Pagination Implementation** ⚠️ HIGH PRIORITY

**Current Issue**: Frontend expects cursor-based pagination but backend may be using offset  
**Required**: Implement cursor-based pagination for all list endpoints

```typescript
// Prisma cursor-based pagination example
const getPosts = async (cursor?: string, limit: number = 10) => {
  const posts = await prisma.post.findMany({
    take: limit + 1, // Take one extra to check if there's a next page
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true
        }
      },
      parent: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          }
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true,
          reposts: true
        }
      }
    }
  });

  const hasNextPage = posts.length > limit;
  const items = hasNextPage ? posts.slice(0, -1) : posts;
  const nextCursor = hasNextPage ? items[items.length - 1].id : null;

  return {
    data: items,
    meta: {
      pagination: {
        cursor: nextCursor,
        hasNextPage,
        hasPreviousPage: !!cursor
      }
    }
  };
};
```

**Endpoints requiring cursor pagination**:
- `GET /feed?cursor={cursor}&limit={limit}`
- `GET /post?cursor={cursor}&limit={limit}`
- `GET /post/user/{userId}?cursor={cursor}&limit={limit}`
- `GET /post/{postId}/comments?cursor={cursor}&limit={limit}`
- `GET /follow/followers/{username}?cursor={cursor}&limit={limit}`
- `GET /follow/following/{username}?cursor={cursor}&limit={limit}`

---

### 3. **Missing Post Type Support** ⚠️ HIGH PRIORITY

**Current Issue**: Backend doesn't handle post types properly  
**Required**: Add post type field and logic

```sql
-- Add to Post model in Prisma schema
model Post {
  id        String   @id @default(cuid())
  content   String?
  type      PostType @default(POST)
  userId    String
  parentId  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?
  
  user      User     @relation(fields: [userId], references: [id])
  parent    Post?    @relation("PostParent", fields: [parentId], references: [id])
  children  Post[]   @relation("PostParent")
  
  likes     Like[]
  bookmarks Bookmark[]
  
  @@map("posts")
}

enum PostType {
  POST
  REPOST
  QUOTE
  COMMENT
}
```

**POST /post endpoint logic**:
```typescript
const createPost = async (req: Request, res: Response) => {
  const { content, parentId, type = 'POST' } = req.body;
  const userId = req.user.id;

  // Validation based on post type
  if (type === 'REPOST' && content?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Reposts cannot have content",
      data: null
    });
  }

  if ((type === 'POST' || type === 'QUOTE') && !content?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Posts and quotes must have content",
      data: null
    });
  }

  if ((type === 'REPOST' || type === 'QUOTE') && !parentId) {
    return res.status(400).json({
      success: false,
      message: "Reposts and quotes must have a parent post",
      data: null
    });
  }

  const post = await prisma.post.create({
    data: {
      content: content?.trim() || null,
      type,
      userId,
      parentId
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true
        }
      },
      parent: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          }
        }
      }
    }
  });

  res.json({
    success: true,
    message: "Post created successfully",
    data: post,
    meta: {
      timestamp: new Date().toISOString()
    }
  });
};
```

---

### 4. **Enhanced User Profile Fields** ⚠️ MEDIUM PRIORITY

**Current Issue**: User model missing fields expected by frontend

```sql
-- Update User model in Prisma schema
model User {
  id              String    @id @default(cuid())
  username        String    @unique
  email           String    @unique
  password        String
  firstName       String?   @map("first_name")
  lastName        String?   @map("last_name")
  dateOfBirth     DateTime? @map("date_of_birth")
  gender          String?
  bio             String?
  avatar          String?
  cover           String?
  city            String?
  state           String?
  country         String?
  phone           String?
  website         String?
  isActive        Boolean   @default(true) @map("is_active")
  isVerified      Boolean   @default(false) @map("is_verified")
  isEmailVerified Boolean   @default(false) @map("is_email_verified")
  isAdmin         Boolean   @default(false) @map("is_admin")
  isBanned        Boolean   @default(false) @map("is_banned")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")
  deletedAt       DateTime? @map("deleted_at")
  
  posts           Post[]
  likes           Like[]
  bookmarks       Bookmark[]
  followers       Follow[] @relation("UserFollowers")
  following       Follow[] @relation("UserFollowing")
  
  @@map("users")
}
```

---

### 5. **Like/Bookmark System Fix** ⚠️ HIGH PRIORITY

**Current Issue**: Inconsistent like/bookmark endpoints  
**Required**: Proper toggle endpoints

```typescript
// Like endpoints
// POST /like - Add like
const addLike = async (req: Request, res: Response) => {
  const { postId } = req.body;
  const userId = req.user.id;

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: { userId, postId }
    }
  });

  if (existingLike) {
    return res.status(400).json({
      success: false,
      message: "Post already liked",
      data: null
    });
  }

  await prisma.like.create({
    data: { userId, postId }
  });

  res.json({
    success: true,
    message: "Post liked successfully",
    data: { liked: true }
  });
};

// DELETE /like/{postId} - Remove like
const removeLike = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.user.id;

  await prisma.like.deleteMany({
    where: { userId, postId }
  });

  res.json({
    success: true,
    message: "Post unliked successfully",
    data: { liked: false }
  });
};
```

---

### 6. **Follow System Enhancement** ⚠️ MEDIUM PRIORITY

**Current Issue**: Follow endpoints need improvement

```sql
-- Follow model
model Follow {
  id          String   @id @default(cuid())
  followerId  String   @map("follower_id")
  followingId String   @map("following_id")
  createdAt   DateTime @default(now()) @map("created_at")
  
  follower    User     @relation("UserFollowers", fields: [followerId], references: [id])
  following   User     @relation("UserFollowing", fields: [followingId], references: [id])
  
  @@unique([followerId, followingId])
  @@map("follows")
}
```

```typescript
// POST /follow endpoint
const followUser = async (req: Request, res: Response) => {
  const { following, operation } = req.body;
  const followerId = req.user.id;

  if (operation === 'follow') {
    await prisma.follow.create({
      data: {
        followerId,
        followingId: following
      }
    });
  } else if (operation === 'unfollow') {
    await prisma.follow.deleteMany({
      where: {
        followerId,
        followingId: following
      }
    });
  }

  res.json({
    success: true,
    message: `User ${operation}ed successfully`,
    data: { operation }
  });
};
```

---

### 7. **Enhanced Post Queries with Counts** ⚠️ HIGH PRIORITY

**Current Issue**: Missing interaction counts and user relationship data

```typescript
// Enhanced post query with all required data
const getPostsWithMetadata = async (userId?: string) => {
  return prisma.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true
        }
      },
      parent: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          }
        }
      },
      _count: {
        select: {
          likes: true,
          children: {
            where: { type: 'COMMENT' }
          },
          reposts: {
            where: { 
              OR: [
                { type: 'REPOST' },
                { type: 'QUOTE' }
              ]
            }
          }
        }
      },
      // Include user's interaction status if userId provided
      ...(userId && {
        likes: {
          where: { userId },
          select: { id: true }
        },
        bookmarks: {
          where: { userId },
          select: { id: true }
        }
      })
    }
  });
};

// Transform to frontend format
const transformPost = (post: any, userId?: string) => ({
  ...post,
  stats: {
    likes: post._count.likes,
    comments: post._count.children,
    reposts: post._count.reposts
  },
  is_liked: userId ? post.likes.length > 0 : false,
  is_bookmarked: userId ? post.bookmarks.length > 0 : false,
  is_reposted: false // Calculate based on user's reposts
});
```

---

### 8. **Authentication & Token Refresh** ⚠️ HIGH PRIORITY

**Current Issue**: Token refresh endpoint needed

```typescript
// POST /auth/token/refresh
const refreshToken = async (req: Request, res: Response) => {
  const { token: refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
        data: null
      });
    }

    const newAccessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: "Tokens refreshed successfully",
      data: {
        token: newAccessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
      data: null
    });
  }
};
```

---

### 9. **Database Indexes for Performance** ⚠️ HIGH PRIORITY

**Required Indexes**:

```sql
-- Add these indexes to your Prisma schema
model Post {
  // ... existing fields
  
  @@index([createdAt])
  @@index([userId])
  @@index([parentId])
  @@index([type])
  @@index([userId, createdAt])
}

model Like {
  // ... existing fields
  
  @@index([postId])
  @@index([userId])
}

model Follow {
  // ... existing fields
  
  @@index([followerId])
  @@index([followingId])
}

model User {
  // ... existing fields
  
  @@index([username])
  @@index([email])
  @@index([createdAt])
}
```

---

### 10. **Feed Algorithm Implementation** ⚠️ MEDIUM PRIORITY

**Current Issue**: Feed endpoint needs proper algorithm

```typescript
// GET /feed - Personalized feed
const getFeed = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { cursor, limit = 10 } = req.query;

  // Get user's following list
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true }
  });

  const followingIds = following.map(f => f.followingId);
  followingIds.push(userId); // Include user's own posts

  const posts = await prisma.post.findMany({
    where: {
      userId: { in: followingIds },
      deletedAt: null
    },
    take: parseInt(limit) + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true
        }
      },
      parent: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          }
        }
      },
      _count: {
        select: {
          likes: true,
          children: { where: { type: 'COMMENT' } },
          reposts: { 
            where: { 
              OR: [{ type: 'REPOST' }, { type: 'QUOTE' }]
            }
          }
        }
      },
      likes: {
        where: { userId },
        select: { id: true }
      },
      bookmarks: {
        where: { userId },
        select: { id: true }
      }
    }
  });

  const hasNextPage = posts.length > parseInt(limit);
  const items = hasNextPage ? posts.slice(0, -1) : posts;
  const nextCursor = hasNextPage ? items[items.length - 1].id : null;

  const transformedPosts = items.map(post => transformPost(post, userId));

  res.json({
    success: true,
    message: "Feed retrieved successfully",
    data: transformedPosts,
    meta: {
      pagination: {
        cursor: nextCursor,
        hasNextPage,
        hasPreviousPage: !!cursor
      },
      timestamp: new Date().toISOString()
    }
  });
};
```

---

## 🔧 **MIDDLEWARE REQUIREMENTS**

### 1. **Response Wrapper Middleware**

```typescript
const responseWrapper = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;
  
  res.json = function(data: any) {
    if (data && typeof data === 'object' && !data.success && !data.message) {
      // Wrap raw data
      const wrappedResponse = {
        success: true,
        message: "Request successful",
        data: data,
        meta: {
          timestamp: new Date().toISOString()
        }
      };
      return originalJson.call(this, wrappedResponse);
    }
    
    // Already wrapped or error response
    return originalJson.call(this, data);
  };
  
  next();
};
```

### 2. **Error Handler Middleware**

```typescript
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const response = {
    success: false,
    message: err.message || "Internal server error",
    data: null,
    meta: {
      timestamp: new Date().toISOString()
    }
  };

  if (err.name === 'ValidationError') {
    return res.status(400).json(response);
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json(response);
  }

  res.status(500).json(response);
};
```

---

## 🚀 **PERFORMANCE OPTIMIZATIONS**

### 1. **Database Connection Pooling**

```typescript
// In your Prisma client setup
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  log: ['query', 'info', 'warn', 'error'],
});

// Connection pool settings in DATABASE_URL
// postgresql://user:password@localhost:5432/wrensly?connection_limit=20&pool_timeout=20
```

### 2. **Redis Caching Strategy**

```typescript
// Cache frequently accessed data
const cacheKeys = {
  userProfile: (userId: string) => `user:${userId}`,
  userFollowers: (userId: string) => `followers:${userId}`,
  trendingPosts: () => 'trending:posts',
  feedCache: (userId: string) => `feed:${userId}`
};

// Cache user profiles for 5 minutes
const getUserProfile = async (userId: string) => {
  const cacheKey = cacheKeys.userProfile(userId);
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  
  await redis.setex(cacheKey, 300, JSON.stringify(user));
  return user;
};
```

---

## 🔒 **SECURITY REQUIREMENTS**

### 1. **Rate Limiting**

```typescript
import rateLimit from 'express-rate-limit';

const createPostLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 posts per 15 minutes
  message: {
    success: false,
    message: "Too many posts created, please try again later",
    data: null
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 login attempts per 15 minutes
  message: {
    success: false,
    message: "Too many login attempts, please try again later",
    data: null
  }
});
```

### 2. **Input Validation**

```typescript
import { body, validationResult } from 'express-validator';

const validatePost = [
  body('content')
    .optional()
    .isLength({ max: 280 })
    .withMessage('Post content cannot exceed 280 characters'),
  body('type')
    .isIn(['POST', 'REPOST', 'QUOTE', 'COMMENT'])
    .withMessage('Invalid post type'),
  body('parentId')
    .optional()
    .isUUID()
    .withMessage('Invalid parent post ID')
];

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      data: errors.array()
    });
  }
  next();
};
```

---

## 📋 **ENDPOINT CHECKLIST**

### ✅ **Required Endpoints**

- [ ] `GET /feed?cursor={cursor}&limit={limit}` - Cursor-based pagination
- [ ] `GET /post?cursor={cursor}&limit={limit}` - All posts with pagination
- [ ] `GET /post/{id}` - Single post with metadata
- [ ] `GET /post/user/{userId}?cursor={cursor}&limit={limit}` - User posts
- [ ] `POST /post` - Create post (all types)
- [ ] `DELETE /post/{id}` - Delete post
- [ ] `POST /like` - Add like
- [ ] `DELETE /like/{postId}` - Remove like
- [ ] `POST /bookmark` - Add bookmark
- [ ] `DELETE /bookmark/{postId}` - Remove bookmark
- [ ] `POST /follow` - Follow/unfollow user
- [ ] `GET /follow/followers/{username}?cursor={cursor}&limit={limit}` - User followers
- [ ] `GET /follow/following/{username}?cursor={cursor}&limit={limit}` - User following
- [ ] `GET /user/me` - Current user profile
- [ ] `GET /user/username/{username}` - User by username
- [ ] `PUT /user/{id}` - Update user profile
- [ ] `POST /auth/login` - User login
- [ ] `POST /auth/token/refresh` - Refresh tokens
- [ ] `POST /user` - User registration
- [ ] `POST /user/verify-email` - Email verification
- [ ] `POST /auth/forgot-password` - Password reset request
- [ ] `POST /auth/reset-password` - Password reset

---

## 🎯 **PRIORITY ORDER**

### **IMMEDIATE (This Week)**
1. ✅ Standardize API responses
2. ✅ Implement cursor-based pagination
3. ✅ Add post type support
4. ✅ Fix like/bookmark endpoints

### **HIGH PRIORITY (Next Week)**
1. ✅ Enhanced user profile fields
2. ✅ Database indexes
3. ✅ Token refresh endpoint
4. ✅ Feed algorithm

### **MEDIUM PRIORITY (Following Weeks)**
1. ✅ Caching implementation
2. ✅ Rate limiting
3. ✅ Input validation
4. ✅ Performance monitoring

This document provides everything your backend developer needs to make Wrensly production-ready with proper ExpressJS + Prisma + PostgreSQL implementation! 🚀