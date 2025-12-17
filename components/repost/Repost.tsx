"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RepeatIcon, MessageSquare } from "lucide-react";
import { Post } from "@/src/types";
import { PostComposer } from "@/components/input/PostComposer";
import { toast } from "sonner";
import { useToggleRepost } from "@/hooks/post/useToggleRepost";
import { useCreatePost } from "@/hooks/post/useCreatePost";
import { POST_TYPE } from "@/src/constants";

interface RepostProps {
  screen: string;
  post: Post;
}

export function Repost({ screen, post }: RepostProps) {
  const [showQuoteComposer, setShowQuoteComposer] = useState(false);
  const { mutate: toggleRepost } = useToggleRepost();
  const { mutate: createPost } = useCreatePost({ screen });

  const handleRepost = () => {
    toggleRepost(
      { postId: post.id, isReposted: post.isReposted, screen },
      {
        onSuccess: () => {
          toast.success(post.isReposted ? "Unreposted" : "Reposted");
        }
      }
    );
  };

  const handleQuote = () => {
    setShowQuoteComposer(true);
  };

  const closeComposer = () => {
    setShowQuoteComposer(false);
  };

  return (
    <>
      {/* Repost Button with Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center gap-1 text-gray-500 hover:text-green-500 hover:bg-transparent transition-colors"
          >
            <RepeatIcon
              className={`${post.isReposted ? "text-green-500" : "text-gray-500"}`}
            />
            <span className="text-sm text-gray-700">{post.stats.reposts}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" sideOffset={4}>
          <DropdownMenuItem onClick={handleRepost} className="flex items-center gap-2">
            <RepeatIcon className="w-4 h-4 text-green-600" />
            {post.isReposted ? 'Undo Repost' : 'Repost'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleQuote} className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            Quote Repost
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Quote Composer Modal */}
      <Dialog open={showQuoteComposer} onOpenChange={setShowQuoteComposer}>
        <DialogContent className="max-w-2xl bg-white rounded-2xl shadow-2xl">
          <DialogTitle className="sr-only">Quote Post Composer</DialogTitle>
          <DialogDescription className="sr-only">
            Compose a post with a quoted repost attached below.
          </DialogDescription>
          <PostComposer
            user={{
              username: post.user.username,
              avatar: post.user.avatar || "/placeholder.svg",
            }}
            placeholder="Add a comment..."
            onSubmit={(content) => {
              createPost(
                { content, type: POST_TYPE.QUOTE, parentId: post.id },
                {
                  onSuccess: () => {
                    setShowQuoteComposer(false);
                    toast.success("Your quote has been posted!");
                  }
                }
              );
            }}
          />

          {/* Quoted Post Box */}
          <div className="border rounded-xl bg-gray-50 p-4 mt-3">
            <div className="flex items-center mb-2">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={post.user.avatar || "/placeholder.svg"}
                  alt={post.user.username}
                />
                <AvatarFallback>{post.user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="ml-2 font-medium">{post.user.username}</span>
            </div>
            <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={closeComposer}
              variant="ghost"
              className="rounded-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
