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
import { RepeatIcon, MessageSquare } from "lucide-react";
import { Post } from "@/src/types";
import { PostComposer } from "@/components/input/PostComposer";
import { ParentPostCard } from "@/components/card/ParentPostCard";
import { toast } from "sonner";
import { useCreateRepost } from "@/hooks/repost/useCreateRepost";
import { useCreateQuote } from "@/hooks/quote/useCreateQuote";
import useUserStore from "@/src/stores/userStore";

interface RepostProps {
  screen: string;
  post: Post;
}

export function Repost({ screen, post }: RepostProps) {
  const [showQuoteComposer, setShowQuoteComposer] = useState(false);
  const { mutate: createRepost } = useCreateRepost({ screen });
  const { mutate: createQuote } = useCreateQuote({ screen });
  const { user } = useUserStore();

  const handleQuote = () => {
    setShowQuoteComposer(true);
  };

  const handleRepost = () => {
    createRepost(
      { parent_id: post.id },
      {
        onSuccess: () => {
          toast.success("Reposted!");
        },
        onError: () => {
          toast.error("Failed to repost.");
        }
      }
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors"
          >
            <RepeatIcon
              className={`w-4 h-4 ${post.is_reposted ? "text-green-500" : "text-gray-500"}`}
            />
            <span className="text-sm text-gray-700">{post.stats.reposts}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" sideOffset={4}>
          <DropdownMenuItem onClick={handleRepost} className="flex items-center gap-2">
            <RepeatIcon className="w-4 h-4 text-green-600" />
            Repost
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleQuote} className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            Quote
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showQuoteComposer} onOpenChange={setShowQuoteComposer}>
        <DialogContent className="max-w-2xl bg-white rounded-2xl shadow-2xl">
          <DialogTitle className="sr-only">Quote Post Composer</DialogTitle>
          <DialogDescription className="sr-only">
            Compose a post with a quoted post attached below.
          </DialogDescription>

          <PostComposer
            user={user}
            screen={screen}
            parent_id={post.id}
            placeholder="Add a comment..."
            onSubmit={(content) => {
              createQuote(
                { content, parent_id: post.id },
                {
                  onSuccess: () => {
                    setShowQuoteComposer(false);
                    toast.success("Your quote has been posted!");
                  },
                  onError: () => {
                    toast.error("Failed to post quote.");
                  }
                }
              );
            }}
          />

          {/* Preview of the post being quoted */}
          <div className="mt-4">
            <ParentPostCard post={post} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
