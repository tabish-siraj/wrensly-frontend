import React from 'react';
import { Button } from '@/components/ui/button';
import { ShareIcon } from 'lucide-react';
import { Post } from '@/src/types';
interface ShareProps {
  screen: string;
  post: Post;
  // onSuccess?: () => void; // Uncomment if you want to handle success callbacks
}

export function Share({ screen, post }: ShareProps) {
  console.log(screen, post);
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => { }}
      className="text-gray-500 hover:text-blue-500 hover:bg-transparent transition-colors"
    >
      <ShareIcon
        className={'text-gray-500'}
      />
    </Button>
  );
}