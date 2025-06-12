// Designing a PostCard component like a tweet, using Chakra UI for styling.
import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";
import { CardBottomRibbon } from "./card-bottom-ribbon";

export interface PostCardProps {
    description: string;
    images?: string[]; // Array of image URLs, up to 4 images
}

export const PostCard: React.FC<PostCardProps> = ({ description, images }) => {
    return (
        <Box
            width="80%"
            padding="20px 20px 0px 20px"
            boxShadow="md"
            margin="20px auto"
        >
            <Text fontSize="xl" fontWeight="bold" marginBottom="10px">
                <Box as="span" display="flex" alignItems="center" gap="5px">
                    <LuUser /> User Icon
                </Box>
            </Text>
            <Text fontSize="md" marginBottom="10px">
                {description}
            </Text>
            {images && images.length > 0 && (
                <Box display="flex" flexWrap="wrap" gap="10px" maxHeight="50%">
                    {images.slice(0, 4).map((image, index) => {
                        let width;
                        if (images.length === 1) width = "100%";
                        else if (images.length === 2) width = "calc(50% - 5px)";
                        else if (images.length === 3) width = index === 0 ? "100%" : "calc(50% - 5px)";
                        else width = "calc(50% - 5px)";
                        return (
                            <Image
                                key={index}
                                src={image}
                                alt={`Post image ${index + 1}`}
                                width={width}
                                maxHeight="200px"
                                borderRadius="md"
                                objectFit="cover"
                            />
                        );
                    })}
                </Box>
            )}
            <CardBottomRibbon
                url="https://example.com" // Replace with actual URL
                onLike={() => console.log("Liked!")}
                onComment={() => console.log("Commented!")}
                onSave={() => console.log("Saved!")}
            />
        </Box>
    );
};