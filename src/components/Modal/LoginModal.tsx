import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
    useToast,
    Flex,
    FormControl,
    FormLabel,
    Checkbox,
    Stack,
    Link,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaLock, FaUserNinja } from 'react-icons/fa';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                {/* <ModalHeader>
                    <Flex align={'center'} justify={'center'}>
                        Đăng nhập hoặc đăng ký
                    </Flex>
                </ModalHeader> */}
                <ModalCloseButton />
                <ModalBody as="form">
                    <Flex align={'center'} justify={'center'}>
                        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                            <Stack align={'center'}>
                                <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                                <Text fontSize={'lg'} color={'gray.600'}>
                                    to enjoy all of our cool <Link color={'teal.400'}>features</Link> ✌️
                                </Text>
                            </Stack>
                            <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                                <Stack spacing={4}>
                                    <FormControl id="email">
                                        <FormLabel>Email address</FormLabel>
                                        <Input type="email" />
                                    </FormControl>
                                    <FormControl id="password">
                                        <FormLabel>Password</FormLabel>
                                        <Input type="password" />
                                    </FormControl>
                                    <Stack spacing={10}>
                                        <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                                            <Checkbox>Remember me</Checkbox>
                                            <Link color={'teal.400'}>Forgot password?</Link>
                                        </Stack>
                                        <Button
                                            bg={'teal.400'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'teal.500',
                                            }}
                                        >
                                            Sign in
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
