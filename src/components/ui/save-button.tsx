// Save button component
import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { PiBookmarkSimple } from "react-icons/pi";


export interface SaveButtonProps {
    onClick: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
    return (
        <Button
            variant="ghost"
            colorScheme="gray"
            onClick={onClick}
            aria-label="save"
        >
            <Icon as={PiBookmarkSimple} />
        </Button>
    );
};