// Comment button component
import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { PiChatCircleLight } from "react-icons/pi";

export interface CommentButtonProps {
    onClick: () => void;
}

export const CommentButton: React.FC<CommentButtonProps> = ({ onClick }) => {

    return (
        <Button
            variant="ghost"
            colorScheme="gray"
            onClick={onClick}
            aria-label="comment"
        >
            <Icon as={PiChatCircleLight} />
        </Button>
    );
};