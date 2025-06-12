// Card bottom ribbon component, that has a like button and a comment button, a share and a save button.
import React from "react";
import { LikeButton } from "./like-button";
import { CommentButton } from "./comment-button";
import { ShareButton } from "./share-button";
import { SaveButton } from "./save-button";
import { Flex, Box } from "@chakra-ui/react";

export interface CardBottomRibbonProps {
    url: string;
    onLike: () => void;
    onComment: () => void;
    onSave: () => void;
}

export const CardBottomRibbon: React.FC<CardBottomRibbonProps> = ({
    url,
    onLike,
    onComment,
    onSave,
}) => {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            padding="20px"
            width="100%"
        >
            <LikeButton isLiked={false} onClick={onLike} />
            <CommentButton onClick={onComment} />
            <ShareButton url={url} />
            <SaveButton onClick={onSave} />

        </Flex>
    );
};