"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useFollowUnfollow } from "@/hooks/follow/useFollow";
import { toast } from "sonner";
import { useState } from "react";

interface User {
  id: string;
  first_name?: string;
  last_name?: string;
  username: string;
  avatar?: string | null;
  is_following?: boolean; // Add mutual follow status
  is_current_user?: boolean; // Add current user check
}

interface FollowListModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  _type: "followers" | "following";
  loading?: boolean;
  error?: boolean | any; // Allow both boolean and error objects
}

const FollowListModal = ({
  isOpen,
  onClose,
  users,
  _type,
  loading = false,
  error = null,
}: FollowListModalProps) => {
  const { mutate: followUnfollow, isPending: isFollowPending } = useFollowUnfollow();
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>({});

  // Ensure users is always an array and handle undefined/null cases
  const safeUsers = Array.isArray(users)
    ? users.filter((user): user is User => Boolean(user && user.id && user.username))
    : [];

  // Initialize following states from user data
  const initializeFollowingStates = () => {
    const states: Record<string, boolean> = {};
    safeUsers.forEach(user => {
      states[user.id] = user.is_following || false;
    });
    return states;
  };

  // Initialize states on first render
  if (Object.keys(followingStates).length === 0 && safeUsers.length > 0) {
    setFollowingStates(initializeFollowingStates());
  }

  const handleFollowUnfollow = (user: User) => {
    if (user.is_current_user) return; // Don't allow following yourself

    const isCurrentlyFollowing = followingStates[user.id] ?? user.is_following;
    const operation = isCurrentlyFollowing ? "unfollow" : "follow";

    followUnfollow({
      following: user.id,
      operation: operation,
    }, {
      onSuccess: () => {
        // Update local state
        setFollowingStates(prev => ({
          ...prev,
          [user.id]: !isCurrentlyFollowing
        }));

        toast.success(`${isCurrentlyFollowing ? "Unfollowed" : "Followed"} ${user.username}`);
      },
      onError: (error) => {
        toast.error(`Failed to ${operation} user`);
        console.error("Follow/unfollow error:", error);
      }
    });
  };

  const getButtonText = (user: User) => {
    if (user.is_current_user) return "You";

    const isCurrentlyFollowing = followingStates[user.id] ?? user.is_following;

    if (_type === "followers") {
      return isCurrentlyFollowing ? "Unfollow" : "Follow Back";
    } else {
      return isCurrentlyFollowing ? "Unfollow" : "Follow";
    }
  };

  const getButtonVariant = (user: User) => {
    if (user.is_current_user) return "outline";

    const isCurrentlyFollowing = followingStates[user.id] ?? user.is_following;
    return isCurrentlyFollowing ? "outline" : "default";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full rounded-xl p-0 overflow-hidden">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-lg font-bold capitalize">{_type}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] p-4">
          {error ? (
            <p className="text-center text-sm text-red-500">Something went wrong.</p>
          ) : loading ? (
            <p className="text-center text-sm text-gray-500">Loading...</p>
          ) : safeUsers.length === 0 ? (
            <p className="text-center text-sm text-gray-500">No {_type} found.</p>
          ) : (
            safeUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`
                      }
                      alt={user.username}
                    />
                    <AvatarFallback>
                      {user.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold">
                        {user.first_name || ''} {user.last_name || ''}
                      </p>
                      {/* {user.verified && ( */}
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      {/* )} */}
                    </div>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="rounded-full px-4 text-xs"
                  variant={getButtonVariant(user)}
                  onClick={() => handleFollowUnfollow(user)}
                  disabled={isFollowPending || user.is_current_user}
                >
                  {isFollowPending ? "..." : getButtonText(user)}
                </Button>
              </div>
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FollowListModal;