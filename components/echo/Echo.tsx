// create a repost component that displays a Echo icon and a count of Echos

import React from 'react';
import { Button } from '@/components/ui/button';
import { RepeatIcon } from 'lucide-react';

interface EchoProps {
  isEchoed: boolean;
  count: number;
  onToggleEcho: () => void;
}

export function Echo({ isEchoed, count, onToggleEcho }: EchoProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggleEcho}
      className="text-gray-500 hover:text-green-500 transition-colors"
    >
      <RepeatIcon
        className={`${isEchoed ? 'text-green-500' : 'text-gray-500'}`}
      />
      {(
        <span className="text-sm text-gray-700">{count}</span>
      )}
    </Button>
  );
}