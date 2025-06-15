import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Input,
    Heading,
    Text,
    VStack,
    Field
} from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
        console.log('Logging in with:', { email, password });
    }
    return (
        <Flex minH="100vh">
            {/* Left Section (Illustration / Branding) */}
            <Flex
                flex={1}
                bg="gray.800"
                align="center"
                justify="center"
                color="white"
                direction="column"
                px={10}
            >
                <FaTwitter size="80px" />
                <Heading mt={4} fontSize="4xl" fontWeight="bold">
                    Happening now
                </Heading>
                <Text mt={2} fontSize="xl">
                    Join Wrensly today.
                </Text>
            </Flex>

            {/* Right Section (Login Form) */}
            <Flex
                flex={1}
                align="center"
                justify="center"
                bg="white"
                color="gray.800"
                p={8}
            >
                <Box w="full" maxW="400px">
                    <Heading mb={6} fontSize="2xl">
                        Sign in to Twitter
                    </Heading>

                    <VStack onSubmit={handleLogin} as="form">
                        <Field.Root>
                            <Field.Label>Email</Field.Label>
                            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Password</Field.Label>
                            <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Field.Root>

                        <Button bg="gray.800" color="white" width="full" type='submit'>
                            Log In
                        </Button>

                        <Text fontSize="sm" color="gray.500">
                            Don't have an account? <Text as="span" color="blue.400" cursor="pointer">Sign up</Text>
                        </Text>
                    </VStack>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Login;
