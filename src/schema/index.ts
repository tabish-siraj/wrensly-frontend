import { z } from 'zod';

export const UserSchema = z.object({
    username: z.string().optional(),
    email: z.string().email().nullable().optional(),
    first_name: z.string().min(1).max(50).nullable().optional(),
    last_name: z.string().min(1).max(50).nullable().optional(),
    dateOfBirth: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
    cover: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    website: z.string().nullable().optional(),

})
export type User = z.infer<typeof UserSchema>;