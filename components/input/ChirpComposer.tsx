"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon, Smile, Calendar, MapPin } from "lucide-react";
import { usePostMutation } from "@/hooks/post/usePost"; // Adjust the import path as necessary

interface ChirpComposerProps {
  user: {
    id: string
    username: string
    avatar: string | null
  };
  onChirp?: (content: string) => void;
  placeholder?: string;
}

export function ChirpComposer({
  user,
  placeholder = "What is happening?!",
}: ChirpComposerProps) {
  const [content, setContent] = useState("");
  const maxLength = 500;
  const postMutation = usePostMutation();

  const handleSubmit = () => {
    if (content.trim() !== "") {
      postMutation.mutate({
        content: content.trim(),
        parentId: null,
      });
    }
  };

  return (
    <div className="border-b border-gray-200 p-4 mb-4">
      <div className="flex space-x-3">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={user.avatar || "/placeholder.svg"}
            alt={user.username}
          />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="min-h-[120px] text-xl border-none resize-none focus:ring-0"
            maxLength={maxLength}
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-500 hover:bg-blue-50"
              >
                <ImageIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-500 hover:bg-blue-50"
              >
                <Smile className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-500 hover:bg-blue-50"
              >
                <Calendar className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-500 hover:bg-blue-50"
              >
                <MapPin className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <span
                className={`text-sm ${content.length > maxLength * 0.9
                  ? "text-red-500"
                  : "text-gray-500"
                  }`}
              >
                {maxLength - content.length}
              </span>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
