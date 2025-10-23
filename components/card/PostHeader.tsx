
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface PostHeaderProps {
    user: {
        username: string;
        avatar: string | null;
    };
}

export function PostHeader({ user }: PostHeaderProps) {
    return (
        <div className="flex items-center mb-4">
            <Link href={`/nest/${user.username}`}>
                <Avatar className="h-12 w-12">
                    <AvatarImage alt={user.username} src={user.avatar || '/placeholder.svg'} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </Link>
            <div className="ml-3">
                <span className="font-bold text-lg">
                    <Link href={`/nest/${user.username}`}>{user.username}</Link>
                </span>
                <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
        </div>
    );
}
