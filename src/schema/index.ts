import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string(),
    username: z.string().min(1),
    email: z.string().email().nullable().optional(),
    first_name: z.string().min(1).max(50).nullable().optional(),
    last_name: z.string().min(1).max(50).nullable().optional(),
    date_of_birth: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
    cover: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    website: z.string().url().nullable().optional(),
    is_active: z.boolean().default(true),
    is_verified: z.boolean().default(false),
    is_email_verified: z.boolean().default(false),
    followers_count: z.number().default(0),
    following_count: z.number().default(0),
    created_at: z.string(),
    updated_at: z.string(),
});

export const EditProfileSchema = z.object({
    username: z.string().min(1).optional(),
    first_name: z.string().min(1).max(50).nullable().optional(),
    last_name: z.string().min(1).max(50).nullable().optional(),
    date_of_birth: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
    cover: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    website: z.string().url().nullable().optional(),
});

export const PostStatsSchema = z.object({
    likes: z.number().default(0),
    comments: z.number().default(0),
    reposts: z.number().default(0),
});

export const PostSchema = z.object({
    id: z.string(),
    content: z.string(),
    type: z.string().default("POST"), // POST, REPOST, QUOTE, COMMENT
    user: UserSchema.pick({ id: true, username: true, first_name: true, last_name: true, avatar: true }),
    parent_id: z.string().nullable(),
    parent: z.any().nullable().optional(), // Using any to avoid circular reference
    created_at: z.string(),
    updated_at: z.string(),
    deleted_at: z.string().nullable(),
    is_liked: z.boolean().default(false),
    is_reposted: z.boolean().default(false),
    is_bookmarked: z.boolean().default(false),
    stats: PostStatsSchema,
});

export type User = z.infer<typeof UserSchema>;
export type EditProfile = z.infer<typeof EditProfileSchema>;
export type PostStats = z.infer<typeof PostStatsSchema>;
export type Post = z.infer<typeof PostSchema>;