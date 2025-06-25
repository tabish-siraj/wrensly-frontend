// create a Share component that displays a share icon and a count of shares

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShareIcon } from 'lucide-react';

interface SpreadProps {
  isSpread: boolean;
  count: number;
  onToggleSpread: () => void;
}

export function Spread({ isSpread, count, onToggleSpread }: SpreadProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggleSpread}
      className="text-gray-500 hover:text-blue-500 transition-colors"
    >
      <ShareIcon
        className={`h-5 w-5 ${isSpread ? 'text-blue-500' : 'text-gray-500'}`}
      />
      {count > 0 && (
        <span className="ml-2 text-sm text-gray-700">{count}</span>
      )}
    </Button>
  );
}