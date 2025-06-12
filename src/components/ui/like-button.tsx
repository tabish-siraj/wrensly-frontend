// Like button component
import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { PiHeartLight, PiHeartFill } from "react-icons/pi";

export interface LikeButtonProps {
    isLiked: boolean;
    onClick: () => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onClick }) => {
    return (
        <Button
            variant="ghost"
            colorScheme={isLiked ? "red" : "gray"}
            onClick={onClick}
        >
            {isLiked ? <Icon as={PiHeartFill} /> : <Icon as={PiHeartLight} />}
        </Button>
    );
};