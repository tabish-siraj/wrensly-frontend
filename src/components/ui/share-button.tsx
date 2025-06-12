// Share button component
import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { PiShareFatLight } from "react-icons/pi";

export interface ShareButtonProps {
    url: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ url }) => {
    return (
        <Button
            variant="ghost"
            colorScheme="gray"
            onClick={console.log.bind(null, `Share this URL: ${url}`)} // Replace with actual share logic
            aria-label="share"
        >
            <Icon as={PiShareFatLight} />
        </Button>
    );
};