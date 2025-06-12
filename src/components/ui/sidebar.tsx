// Building a sidebar component with menus like Home, Profile, Settings, and Logout
import React from 'react';
import { Text, Box, Flex, useMediaQuery } from '@chakra-ui/react';
import { PiBirdLight } from "react-icons/pi";


export const Sidebar: React.FC = () => {
    const [isLargerThanMd] = useMediaQuery(['(min-width: 48em)']); // 48em is equivalent to 768px

    return (
        <Flex
            direction="column"
            width={{ base: '100%' }}
            height="100vh"
            bg="gray.800"
            color="white"
            display={{ base: isLargerThanMd ? 'block' : 'none', md: 'block' }}
        >
            <Box p={4} borderBottomWidth="1px">
                <Flex fontSize="xl" fontWeight="bold" alignItems="center" gap={2}>
                    <PiBirdLight />
                    <Text>
                        Wrensly
                    </Text>
                </Flex>
            </Box>
            <Box p={4}>
                <Box mb={2}>Home</Box>
                <Box mb={2}>Profile</Box>
                <Box mb={2}>Settings</Box>
                <Box>Logout</Box>
            </Box>
        </Flex>
    );
};