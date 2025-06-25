// create a Like component that displays a heart icon and a count of likes

import React from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";

interface FeatherProps {
    isFeathered: boolean;
    count: number;
    onToggleFeather: () => void;
}

export function Feather({ isFeathered, count, onToggleFeather }: FeatherProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFeather}
            className="text-gray-500 hover:text-red-500 transition-colors"
        >
            <HeartIcon
                className={`h-5 w-5 ${isFeathered ? "text-red-500" : "text-gray-500"}`}
            />
            {count > 0 && (
                <span className="ml-2 text-sm text-gray-700">{count}</span>
            )}
        </Button>
    );
}