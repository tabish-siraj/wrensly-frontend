// create a Share component that displays a share icon and a count of shares

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShareIcon } from 'lucide-react';

interface ShareProps {
  isShared: boolean;
  count: number;
  onToggleShare: () => void;
}

export function Share({ isShared, count, onToggleShare }: ShareProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggleShare}
      className="text-gray-500 hover:text-blue-500 transition-colors"
    >
      <ShareIcon
        className={`h-5 w-5 ${isShared ? 'text-blue-500' : 'text-gray-500'}`}
      />
      {count > 0 && (
        <span className="ml-2 text-sm text-gray-700">{count}</span>
      )}
    </Button>
  );
}