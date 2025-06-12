// Main component that includes a search bar and a content area, designed using Chakra UI for styling.
import { SearchBar } from "./searchbar";
import React from "react";
import { Box } from "@chakra-ui/react";
import { PostCard } from "./postcard";


export const Main: React.FC = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            height="100%"
        >
            <SearchBar />
            <Box
                width={{ base: "100%" }}
                overflow="scroll"
            >
                <PostCard
                    description="This is a sample description for the post. It provides an overview of the content."
                    images={[]}
                />
                <PostCard
                    description="This is a sample description for the post. It provides an overview of the content."
                    images={[
                        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
                    ]}
                />
                <PostCard
                    description="This is a sample description for the post. It provides an overview of the content."
                    images={[
                        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
                        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
                    ]}
                />
                <PostCard
                    description="This is a sample description for the post. It provides an overview of the content."
                    images={[
                        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
                        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
                        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
                    ]}
                />
                <PostCard
                    description="This is a sample description for the post. It provides an overview of the content."
                    images={[
                        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
                        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
                        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
                        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
                    ]}
                />
            </Box>
        </Box>
    );
};