"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Share2Icon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // DialogDescription,
} from "@/components/ui/dialog";
import { Post } from "@/src/types";
import env from "@/env";

interface ShareProps {
  post: Post;
}

export function Share({ post }: ShareProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const postUrl = `${env.BASE_URL}/post/${post.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(postUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy link: ", err);
        toast.error("Failed to copy link.");
      });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-1 text-gray-500 hover:text-blue-500 hover:bg-transparent transition-colors"
        >
          <Share2Icon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              defaultValue={postUrl}
              readOnly
              className="h-9"
            />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
