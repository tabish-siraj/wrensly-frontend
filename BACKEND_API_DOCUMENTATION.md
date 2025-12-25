# Wrensly Frontend - Backend API Documentation

## Overview

This document provides comprehensive documentation for all backend interactions in the Wrensly frontend application, including expected payloads, responses, and usage patterns.

## Base Configuration

### API Client Setup
- **Base URL**: `https://wrensly-backend.onrender.com/api` (configurable via `API_BASE_URL` env var)
- **Content Type**: `application/json`
- **Authentication**: Bearer token in Authorization header
- **Auto Token Refresh**: Handles 401/403 responses with refresh token

### Authentication Flow
- Access tokens stored in `localStorage.getItem("token")`
- Refresh tokens stored in `localStorage.getItem("refreshToken")`
- Auto-redirect to `/auth/login` on auth failure

---

## 🔐 Authentication & User Management

### 1. User Registration
**Hook**: `useSignup()`  
**Endpoint**: `POST /user`

**Payload**:
```typescript
{
  username: string;
  email: string;
  password: string;
}
```

**Response**: Standard success response
**On Success**: Redirects to `/auth/login`

---

### 2. User Login
**Hook**: `useLogin()`  
**Endpoints**: 
- `POST /auth/login`
- `GET /user/me` (after login)

**Payload**:
```typescript
{
  email: string;
  password: string;
}
```

**Response**:
```typescript
{
  data: {
    token: string;
    refreshToken: string;
  }
}
```

**Additional Actions**:
- Stores tokens in localStorage
- Fetches user profile via `/user/me`
- Updates user store
- Redirects to home page

---

### 3. Token Refresh
**Endpoint**: `POST /auth/token/refresh`

**Payload**:
```typescript
{
  token: string; // refresh token
}
```

**Response**:
```typescript
{
  data: {
    token: string;
    refreshToken: string;
  }
}
```

---

### 4. Forgot Password
**Hook**: `useForgotPassword()`  
**Endpoint**: `POST /auth/forgot-password`

**Payload**:
```typescript
{
  email: string;
}
```

---

### 5. Reset Password
**Hook**: `useResetPassword()`  
**Endpoint**: `POST /auth/reset-password`

**Payload**:
```typescript
{
  token: string;
  password: string;
}
```

---

### 6. Email Verification
**Hook**: `useVerifyEmail()`  
**Endpoint**: `POST /user/verify-email?token={token}`

**Payload**:
```typescript
{
  token: string;
}
```

---

### 7. Resend Verification Email
**Hook**: `useResendVerifyEmail()`  
**Endpoint**: `POST /user/resend-verify-email`

**Payload**:
```typescript
{
  username: string;
  email: string;
}
```

---

## 👤 User Profile Management

### 8. Get Current User
**Endpoint**: `GET /user/me`

**Response**:
```typescript
{
  data: User; // Full user object
}
```

---

### 9. Get User by Username
**Hook**: `useUserByUsername(username)`  
**Endpoint**: `GET /user/username/{username}`

**Response**:
```typescript
{
  data: User & {
    isFollowing?: boolean;
    followers_count: number;
    following_count: number;
  }
}
```

---

### 10. Get User by Email
**Hook**: `useUserByEmail(email)`  
**Endpoint**: `GET /user/email/{email}`

**Response**: Same as above

---

### 11. Get User by ID
**Hook**: `useUserByid(id)`  
**Endpoint**: `GET /user/{id}`

**Response**: Same as above

---

### 12. Update User Profile
**Hook**: `useUpdateProfile()`  
**Endpoints**:
- `PUT /user/{id}`
- `GET /user/me` (refresh after update)

**Payload**:
```typescript
{
  id: string;
  payload: Partial<User>; // Any user fields to update
}
```

**User Object Structure**:
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string; // ISO date string
  gender: string;
  bio: string;
  avatar: string;
  cover: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  website: string; // Must be valid URL
  is_active: boolean;
  is_verified: boolean;
  is_email_verified: boolean;
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
}
```

---

## 📝 Post Management

### 13. Create Post
**Hook**: `useCreatePost({ screen })`  
**Endpoint**: `POST /post`

**Payload**:
```typescript
{
  content?: string;
  parent_id?: string;
  type?: "POST" | "REPOST" | "QUOTE" | "COMMENT";
}
```

**Post Types**:
- `POST`: Regular post
- `REPOST`: Pure repost (empty content)
- `QUOTE`: Quote post (with user comment)
- `COMMENT`: Reply to a post

---

### 14. Delete Post
**Hook**: `useDeletePost()`  
**Endpoint**: `DELETE /post/{post_id}`

**Payload**:
```typescript
{
  post_id: string;
}
```

---

### 15. Get All Posts
**Hook**: `usePost()`  
**Endpoint**: `GET /post`

**Response**:
```typescript
{
  data: Post[];
}
```

---

### 16. Get Post by ID
**Hook**: `usePostByID(postId)`  
**Endpoint**: `GET /post/{postId}`

**Response**:
```typescript
{
  data: Post;
}
```

---

### 17. Get Posts by User ID
**Hook**: `usePostByUserID(userId)`  
**Endpoint**: `GET /post/user/{userId}`

**Response**:
```typescript
{
  data: Post[];
}
```

---

### 18. Get User Feed
**Hook**: `useFeed()`  
**Endpoint**: `GET /feed`

**Response**:
```typescript
{
  data: Post[];
}
```

**Post Object Structure**:
```typescript
interface Post {
  id: string;
  content: string;
  type: "POST" | "REPOST" | "QUOTE" | "COMMENT";
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  parent_id: string | null;
  parent: Post | null; // For quotes and reposts
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_liked: boolean;
  is_reposted: boolean;
  is_bookmarked: boolean;
  stats: {
    likes: number;
    comments: number;
    reposts: number;
  };
}
```

---

## 🔄 Post Interactions

### 19. Create Repost
**Hook**: `useCreateRepost({ screen })`  
**Endpoint**: `POST /post`

**Payload**:
```typescript
{
  parent_id: string;
  type: "REPOST";
  content: ""; // Empty for pure reposts
}
```

---

### 20. Create Quote Post
**Hook**: `useCreateQuote({ screen })`  
**Endpoint**: `POST /post`

**Payload**:
```typescript
{
  content: string; // User's comment
  parent_id: string;
  type: "QUOTE";
}
```

---

### 21. Toggle Like
**Hook**: `useToggleLike()`  
**Endpoints**:
- `POST /like` (to like)
- `DELETE /like/{postId}` (to unlike)

**Like Payload**:
```typescript
{
  postId: string;
  is_liked: true;
}
```

**Unlike**: No payload, just DELETE to `/like/{postId}`

---

### 22. Toggle Bookmark
**Hook**: `useToggleBookmark()`  
**Endpoints**:
- `POST /bookmark` (to bookmark)
- `DELETE /bookmark/{postId}` (to unbookmark)

**Bookmark Payload**:
```typescript
{
  postId: string;
  is_bookmarked: true;
}
```

**Unbookmark**: No payload, just DELETE to `/bookmark/{postId}`

---

## 💬 Comments

### 23. Create Comment
**Hook**: `useCreateComment({ screen })`  
**Endpoint**: `POST /post/{post_id}/comment`

**Payload**:
```typescript
{
  content: string;
  parent_id?: string; // For nested replies
}
```

---

### 24. Get Post Comments
**Hook**: `usePostComments(postId)`  
**Endpoint**: `GET /post/{postId}/comments`

**Response**:
```typescript
{
  data: Post[]; // Comments are treated as posts
}
```

---

## 👥 Follow System

### 25. Follow/Unfollow User
**Hook**: `useFollowUnfollow()`  
**Endpoint**: `POST /follow`

**Payload**:
```typescript
{
  following: string; // User ID to follow/unfollow
  operation: "follow" | "unfollow";
}
```

---

### 26. Get User Followers
**Hook**: `useGetFollowers(username)`  
**Endpoint**: `GET /follow/followers/{username}`

**Response**:
```typescript
{
  data: User[];
}
```

---

### 27. Get User Following
**Hook**: `useGetFollowings(username)`  
**Endpoint**: `GET /follow/following/{username}`

**Response**:
```typescript
{
  data: User[];
}
```

---

## 🔧 Utility Functions

### Data Normalization
The frontend uses utility functions to normalize API responses:

- `normalizePosts(posts)`: Ensures posts array is valid
- `normalizePost(post)`: Normalizes single post object
- `removeEmptyFields(data)`: Removes null/undefined fields before API calls

### Query Invalidation
Most mutations invalidate relevant React Query caches:

- Post operations: Invalidate `[screen]` queries
- User operations: Invalidate `["user"]` and `["profile"]` queries
- Follow operations: Trigger router refresh

---

## 📊 Response Patterns

### Standard Success Response
```typescript
{
  success: boolean;
  message: string;
  data: any;
  status: number;
}
```

### Standard Error Response
```typescript
{
  success: false;
  message: string;
  error?: any;
  status: number;
}
```

---

## 🚀 Usage Examples

### Creating a Post
```typescript
const createPost = useCreatePost({ screen: "feed" });

createPost.mutate({
  content: "Hello, Wrensly!",
  type: "POST"
});
```

### Following a User
```typescript
const followUser = useFollowUnfollow();

followUser.mutate({
  following: "user123",
  operation: "follow"
});
```

### Updating Profile
```typescript
const updateProfile = useUpdateProfile();

updateProfile.mutate({
  id: "user123",
  payload: {
    first_name: "John",
    bio: "Updated bio"
  }
});
```

---

## 🔒 Security Notes

1. **Authentication**: All protected endpoints require Bearer token
2. **Token Refresh**: Automatic refresh on 401/403 responses
3. **Client-Side Storage**: Tokens stored in localStorage
4. **HTTPS Only**: All API calls use HTTPS
5. **Input Validation**: Zod schemas validate all user inputs

---

## 📝 Notes for Backend Implementation

1. **Consistent Response Format**: All endpoints should return the standard response format
2. **Pagination**: Consider adding pagination for posts, followers, etc.
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **File Upload**: Profile pictures and media uploads not yet implemented
5. **Real-time Updates**: Consider WebSocket integration for live updates
6. **Search**: Search functionality not yet implemented
7. **Notifications**: Notification system endpoints not yet defined

This documentation covers all current frontend-backend interactions. Update as new features are added.