"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar?: string | null;
}

interface FollowListModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  _type: "followers" | "following";
  loading?: boolean;
  error?: boolean;
}

const FollowListModal = ({
  isOpen,
  onClose,
  users,
  _type,
  loading = false,
  error = false,
}: FollowListModalProps) => {
  const safeUsers = Array.isArray(users) ? users : [];

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
          ) : users.length === 0 ? (
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
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold">{user.first_name} {user.last_name}</p>
                      {/* {user.verified && ( */}
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      {/* )} */}
                    </div>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
                <Button size="sm" className="rounded-full px-4 text-xs">
                  {_type === "followers" ? "Follow Back" : "Following"}
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