import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "./sidebar";
import { Main } from "./main";

const Home = () => {
    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            height="100vh"
            width="100vw"
            overflow="hidden"
        >
            <Box
                width={{ base: "100%", md: "20%" }}
                height="100%"
                display={{ base: "none", md: "block" }}
            >
                <Sidebar />
            </Box>
            <Box
                flex="1"
                p={1}
                height="100%"
                display="flex"
                justifyContent="center"
            >
                <Main />
            </Box>
            <Box
                width={{ base: "100%", md: "20%" }}
                height="100%"
                bg="red.500"
                display={{ base: "none", md: "block" }}
            >
                Right Sidebar
            </Box>
        </Flex>
    )
}

export default Home;
