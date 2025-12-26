# Wrensly Backend API Documentation

## Overview

This document provides comprehensive API documentation for the Wrensly backend with all required payloads, responses, and examples for production deployment.

**Base URL**: `https://your-domain.com/api`

## Response Format

All API responses follow a standardized format:

### Success Response
```json
{
  "success": true,
  "message": "Request successful",
  "data": {...},
  "meta": {
    "pagination": {
      "cursor": "eyJpZCI6IjEyMyJ9",
      "has_next_page": true,
      "has_previous_page": false
    },
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "data": null,
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

## Authentication

Protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### POST /api/auth/login
**Rate Limit**: 5 requests per 15 minutes  
**Description**: Login user and get access tokens

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Validation Rules**:
- `email`: Valid email format (required)
- `password`: Minimum 6 characters (required)

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "clx1234567890",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "avatar": "https://example.com/avatar.jpg"
    }
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

**Error Response (401)**:
```json
{
  "success": false,
  "message": "Invalid email or password",
  "data": null,
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### POST /api/auth/token/refresh
**Rate Limit**: 5 requests per 15 minutes  
**Description**: Refresh access token using refresh token

**Request Body**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### POST /api/auth/forgot-password
**Rate Limit**: 5 requests per 15 minutes  
**Description**: Request password reset email

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Password reset email sent successfully",
  "data": null,
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### POST /api/auth/reset-password
**Rate Limit**: 5 requests per 15 minutes  
**Description**: Reset password using token from email

**Request Body**:
```json
{
  "token": "reset-token-from-email",
  "password": "newpassword123"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Password reset successfully",
  "data": null,
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

---

## 👤 User Endpoints

### POST /api/user
**Description**: Register new user account

**Request Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules**:
- `username`: String (optional)
- `email`: Valid email format (required)
- `password`: String (required)

**Success Response (201)**:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "clx1234567890",
    "username": "johndoe",
    "email": "john@example.com",
    "isEmailVerified": false,
    "createdAt": "2024-12-25T10:30:00Z"
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### GET /api/user/me
**Authentication**: Required  
**Description**: Get current user profile

**Success Response (200)**:
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "clx1234567890",
    "username": "johndoe",
    "email": "john@example.com",
    "is_email_verified": true,
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "1990-01-01T00:00:00Z",
    "gender": "male",
    "bio": "Software developer passionate about technology",
    "avatar": "https://example.com/avatar.jpg",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "phone": "+1234567890",
    "website": "https://johndoe.com",
    "followers_count": 150,
    "following_count": 75,
    "created_at": "2024-01-01T10:30:00Z",
    "updated_at": "2024-12-25T10:30:00Z"
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### GET /api/user/username/{username}
**Authentication**: Required  
**Description**: Get user profile by username

**Success Response (200)**:
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "clx1234567890",
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "bio": "Software developer",
    "avatar": "https://example.com/avatar.jpg",
    "followers_count": 150,
    "following_count": 75,
    "is_following": false,
    "created_at": "2024-01-01T10:30:00Z"
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### PUT /api/user/{id}
**Authentication**: Required  
**Description**: Update user profile

**Request Body**:
```json
{
  "username": "johndoe_updated",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-01-01T00:00:00Z",
  "gender": "male",
  "bio": "Updated bio text",
  "avatar": "https://example.com/new-avatar.jpg",
  "city": "San Francisco",
  "state": "CA",
  "country": "USA",
  "phone": "+1987654321",
  "website": "https://johndoe-updated.com"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "clx1234567890",
    "username": "johndoe_updated",
    "first_name": "John",
    "last_name": "Doe",
    "bio": "Updated bio text",
    "updated_at": "2024-12-25T10:30:00Z"
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### POST /api/user/verify-email
**Description**: Verify email address using token

**Request Body**:
```json
{
  "token": "verification-token-from-email"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": null,
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### POST /api/user/resend-verify-email
**Description**: Resend email verification

**Request Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Verification email resent successfully",
  "data": null,
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

---

## 📝 Post Endpoints

### GET /api/post
**Authentication**: Required  
**Description**: Get all posts with cursor-based pagination

**Query Parameters**:
- `cursor` (optional): Cursor for pagination
- `limit` (optional): Number of items per page (max 50, default 10)

**Example**: `/api/post?cursor=clx1234567890&limit=20`

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": [
    {
      "id": "clx1234567890",
      "content": "Hello world! This is my first post.",
      "type": "POST",
      "created_at": "2024-12-25T10:30:00Z",
      "user": {
        "id": "clx0987654321",
        "username": "johndoe",
        "first_name": "John",
        "last_name": "Doe",
        "avatar": "https://example.com/avatar.jpg"
      },
      "parent": null,
      "stats": {
        "likes": 25,
        "comments": 5,
        "reposts": 3
      },
      "is_liked": false,
      "is_bookmarked": true,
      "is_reposted": false
    }
  ],
  "meta": {
    "pagination": {
      "cursor": "clx1234567891",
      "has_next_page": true,
      "has_previous_page": false
    },
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### POST /api/post
**Authentication**: Required  
**Rate Limit**: 10 posts per 15 minutes  
**Description**: Create a new regular post

**Request Body**:
```json
{
  "content": "Hello world! This is my new post."
}
```

**Validation Rules**:
- `content`: 1-280 characters (required)

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": "clx1234567890",
    "content": "Hello world! This is my new post.",
    "type": "POST",
    "created_at": "2024-12-25T10:30:00Z",
    "user_id": "clx0987654321",
    "parent_id": null,
    "root_id": null
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### GET /api/post/{id}
**Authentication**: Required  
**Description**: Get single post by ID

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Post retrieved successfully",
  "data": {
    "id": "clx1234567890",
    "content": "Hello world!",
    "type": "POST",
    "created_at": "2024-12-25T10:30:00Z",
    "user": {
      "id": "clx0987654321",
      "username": "johndoe",
      "first_name": "John",
      "last_name": "Doe",
      "avatar": "https://example.com/avatar.jpg"
    },
    "stats": {
      "likes": 25,
      "comments": 5,
      "reposts": 3
    },
    "is_liked": true,
    "is_bookmarked": false,
    "is_reposted": false
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### GET /api/post/user/{userId}
**Authentication**: Required  
**Description**: Get posts by specific user with pagination

**Query Parameters**:
- `cursor` (optional): Cursor for pagination
- `limit` (optional): Number of items per page (max 50, default 10)

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": [
    {
      "id": "clx1234567890",
      "content": "User's post content",
      "type": "POST",
      "created_at": "2024-12-25T10:30:00Z",
      "user": {
        "id": "clx0987654321",
        "username": "johndoe",
        "first_name": "John",
        "last_name": "Doe",
        "avatar": "https://example.com/avatar.jpg"
      },
      "stats": {
        "likes": 10,
        "comments": 2,
        "reposts": 1
      },
      "is_liked": false,
      "is_bookmarked": false,
      "is_reposted": false
    }
  ],
  "meta": {
    "pagination": {
      "cursor": "clx1234567891",
      "has_next_page": true,
      "has_previous_page": false
    },
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### POST /api/post/{id}/comment
**Authentication**: Required  
**Rate Limit**: 10 posts per 15 minutes  
**Description**: Create a comment on a post

**Request Body**:
```json
{
  "content": "Great post! Thanks for sharing."
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Comment created successfully",
  "data": {
    "id": "clx1234567891",
    "content": "Great post! Thanks for sharing.",
    "type": "COMMENT",
    "created_at": "2024-12-25T10:30:00Z",
    "user_id": "clx0987654321",
    "parent_id": "clx1234567890",
    "root_id": "clx1234567890"
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### POST /api/post/{id}/quote
**Authentication**: Required  
**Rate Limit**: 10 posts per 15 minutes  
**Description**: Create a quote post with additional content

**Request Body**:
```json
{
  "content": "Adding my thoughts to this great post..."
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Quote created successfully",
  "data": {
    "id": "clx1234567892",
    "content": "Adding my thoughts to this great post...",
    "type": "QUOTE",
    "created_at": "2024-12-25T10:30:00Z",
    "user_id": "clx0987654321",
    "parent_id": "clx1234567890",
    "root_id": "clx1234567890"
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### POST /api/post/{id}/repost
**Authentication**: Required  
**Rate Limit**: 10 posts per 15 minutes  
**Description**: Repost a post (no additional content)

**Request Body**: Empty `{}`

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Repost created successfully",
  "data": {
    "id": "clx1234567893",
    "content": "",
    "type": "REPOST",
    "created_at": "2024-12-25T10:30:00Z",
    "user_id": "clx0987654321",
    "parent_id": "clx1234567890",
    "root_id": "clx1234567890"
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### DELETE /api/post/{id}
**Authentication**: Required  
**Description**: Delete a post (only post owner can delete)

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Post deleted successfully",
  "data": null,
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

---

## 📰 Feed Endpoint

### GET /api/feed
**Authentication**: Required  
**Description**: Get personalized feed with posts from followed users

**Query Parameters**:
- `cursor` (optional): Cursor for pagination
- `limit` (optional): Number of items per page (max 50, default 10)

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Feed retrieved successfully",
  "data": [
    {
      "id": "clx1234567890",
      "content": "Post from followed user",
      "type": "POST",
      "created_at": "2024-12-25T10:30:00Z",
      "user": {
        "id": "clx0987654321",
        "username": "followeduser",
        "first_name": "Followed",
        "last_name": "User",
        "avatar": "https://example.com/avatar.jpg"
      },
      "stats": {
        "likes": 15,
        "comments": 3,
        "reposts": 2
      },
      "is_liked": false,
      "is_bookmarked": true,
      "is_reposted": false
    }
  ],
  "meta": {
    "pagination": {
      "cursor": "clx1234567891",
      "has_next_page": true,
      "has_previous_page": false
    },
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

---

## ❤️ Like Endpoints

### POST /api/like
**Authentication**: Required  
**Description**: Like a post

**Request Body**:
```json
{
  "post_id": "clx1234567890"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Post liked successfully",
  "data": {
    "is_liked": true
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

**Error Response (400) - Already Liked**:
```json
{
  "success": false,
  "message": "Post already liked",
  "data": null,
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### DELETE /api/like/{post_id}
**Authentication**: Required  
**Description**: Unlike a post

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Post unliked successfully",
  "data": {
    "is_liked": false
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

---

## 🔖 Bookmark Endpoints

### POST /api/bookmark
**Authentication**: Required  
**Description**: Bookmark a post

**Request Body**:
```json
{
  "post_id": "clx1234567890"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Post bookmarked successfully",
  "data": {
    "is_bookmarked": true
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### DELETE /api/bookmark/{post_id}
**Authentication**: Required  
**Description**: Remove bookmark from a post

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Bookmark removed successfully",
  "data": {
    "is_bookmarked": false
  },
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

---

## 👥 Follow System Endpoints

### POST /api/follow
**Authentication**: Required  
**Rate Limit**: 20 requests per 15 minutes  
**Description**: Follow or unfollow a user

**Request Body**:
```json
{
  "following": "clx1234567890",
  "operation": "follow"
}
```

**Validation Rules**:
- `following`: User ID (required)
- `operation`: "follow" or "unfollow" (required)

**Success Response (200)**:
```json
{
  "success": true,
  "message": "User followed successfully",
  "data": "followed",
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### GET /api/follow/followers/{username}
**Authentication**: Required  
**Description**: Get user's followers with pagination

**Query Parameters**:
- `cursor` (optional): Cursor for pagination
- `limit` (optional): Number of items per page (max 50, default 10)

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Followers retrieved successfully",
  "data": [
    {
      "id": "clx1234567890",
      "user": {
        "id": "clx0987654321",
        "username": "follower1",
        "first_name": "John",
        "last_name": "Doe",
        "avatar": "https://example.com/avatar1.jpg"
      },
      "created_at": "2024-12-20T10:30:00Z"
    },
    {
      "id": "clx1234567891",
      "user": {
        "id": "clx0987654322",
        "username": "follower2",
        "first_name": "Jane",
        "last_name": "Smith",
        "avatar": "https://example.com/avatar2.jpg"
      },
      "created_at": "2024-12-19T15:45:00Z"
    }
  ],
  "meta": {
    "pagination": {
      "cursor": "clx1234567892",
      "has_next_page": true,
      "has_previous_page": false
    },
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

### GET /api/follow/following/{username}
**Authentication**: Required  
**Description**: Get users that a user is following with pagination

**Query Parameters**:
- `cursor` (optional): Cursor for pagination
- `limit` (optional): Number of items per page (max 50, default 10)

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Following retrieved successfully",
  "data": [
    {
      "id": "clx1234567890",
      "user": {
        "id": "clx0987654321",
        "username": "following1",
        "first_name": "Alice",
        "last_name": "Johnson",
        "avatar": "https://example.com/avatar3.jpg"
      },
      "created_at": "2024-12-18T09:15:00Z"
    }
  ],
  "meta": {
    "pagination": {
      "cursor": "clx1234567891",
      "has_next_page": false,
      "has_previous_page": false
    },
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

---

## 📊 Pagination

All list endpoints support cursor-based pagination for optimal performance:

### Query Parameters
- `cursor` (optional): Cursor for next page (get from previous response)
- `limit` (optional): Items per page (1-50, default: 10)

### Pagination Metadata
```json
{
  "meta": {
    "pagination": {
      "cursor": "clx1234567890",
      "has_next_page": true,
      "has_previous_page": false
    }
  }
}
```

### Example Usage
```
GET /api/post?limit=20
GET /api/post?cursor=clx1234567890&limit=20
GET /api/feed?cursor=clx1234567890&limit=15
```

---

## 🚦 Rate Limiting

Different endpoint categories have specific rate limits:

| Category | Limit | Window | Endpoints |
|----------|-------|--------|-----------|
| **Authentication** | 5 requests | 15 minutes | `/api/auth/*` |
| **Post Creation** | 10 requests | 15 minutes | `POST /api/post/*` |
| **Follow Actions** | 20 requests | 15 minutes | `POST /api/follow` |
| **General** | 100 requests | 15 minutes | All other endpoints |

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

### Rate Limit Exceeded Response (429)
```json
{
  "success": false,
  "message": "Too many requests, please try again later",
  "data": null,
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

---

## ❌ Error Codes & Responses

| Code | Description | Example |
|------|-------------|---------|
| **400** | Bad Request | Validation errors, invalid data |
| **401** | Unauthorized | Invalid/missing token |
| **403** | Forbidden | Insufficient permissions |
| **404** | Not Found | Resource doesn't exist |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Server-side error |

### Validation Error Example (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "data": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ],
  "meta": {
    "timestamp": "2024-12-25T10:30:00Z"
  }
}
```

---

## 📝 Post Types & Validation

| Type | Description | Content Required | Parent Required |
|------|-------------|------------------|-----------------|
| **POST** | Regular post | ✅ Yes (1-280 chars) | ❌ No |
| **COMMENT** | Comment on post | ✅ Yes (1-280 chars) | ✅ Yes |
| **QUOTE** | Quote with content | ✅ Yes (1-280 chars) | ✅ Yes |
| **REPOST** | Share without content | ❌ No | ✅ Yes |

---

## 👤 User Profile Fields

### Available Profile Fields
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-01-01T00:00:00Z",
  "gender": "male",
  "bio": "Software developer passionate about technology",
  "avatar": "https://example.com/avatar.jpg",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "phone": "+1234567890",
  "website": "https://johndoe.com"
}
```

### Field Validation
- All fields are optional
- `date_of_birth`: ISO 8601 datetime format
- `bio`: Maximum 280 characters
- `website`: Valid URL format
- `email`: Valid email format (unique)
- `username`: Alphanumeric + underscore (unique)

---

## 🔒 Security Features

### Authentication
- **JWT Tokens**: Access tokens (15min) + Refresh tokens (7 days)
- **Password Hashing**: bcrypt with salt rounds
- **Email Verification**: Required for account activation

### Protection
- **Rate Limiting**: Endpoint-specific limits
- **Input Validation**: Zod schema validation
- **CORS**: Cross-origin request protection
- **Helmet**: Security headers
- **SQL Injection**: Prisma ORM protection

### Headers Required
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

---

## 🚀 Production Deployment Checklist

### Environment Variables
```env
DATABASE_URL="postgresql://user:password@localhost:5432/wrensly"
JWT_SECRET="your-super-secret-jwt-key"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
EMAIL_SERVICE_API_KEY="your-email-service-key"
FRONTEND_URL="https://your-frontend-domain.com"
```

### Database Migration
```bash
npx prisma migrate deploy
npx prisma generate
```

### Health Check Endpoint
```
GET /health
Response: { "status": "ok", "timestamp": "2024-12-25T10:30:00Z" }
```

---

## 📞 Support & Contact

For API support or questions:
- **Documentation**: This file
- **Issues**: Check implementation files in `/src`
- **Rate Limits**: Contact admin for increases
- **Status**: Monitor via health check endpoint

**API Version**: 1.0  
**Last Updated**: December 25, 2024
