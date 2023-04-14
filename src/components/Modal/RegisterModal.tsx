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
    VStack,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    InputRightElement,
    Stack,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { FaEnvelope, FaLock, FaRegEye, FaRegEyeSlash, FaUserNinja, FaUserSecret } from 'react-icons/fa';
import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                {/* <ModalHeader>Sign up</ModalHeader> */}
                <ModalCloseButton />
                <ModalBody>
                    <Flex align={'center'} justify={'center'} bg={useColorModeValue('white.50', 'white.800')}>
                        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                            <Stack align={'center'}>
                                <Heading fontSize={'4xl'} textAlign={'center'}>
                                    Sign up
                                </Heading>
                                <Text fontSize={'lg'} color={'gray.600'}>
                                    to enjoy all of our cool features ✌️
                                </Text>
                            </Stack>
                            <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                                <Stack spacing={4}>
                                    <HStack>
                                        <Box>
                                            <FormControl id="firstName" isRequired>
                                                <FormLabel>First Name</FormLabel>
                                                <Input type="text" />
                                            </FormControl>
                                        </Box>
                                        <Box>
                                            <FormControl id="lastName">
                                                <FormLabel>Last Name</FormLabel>
                                                <Input type="text" />
                                            </FormControl>
                                        </Box>
                                    </HStack>
                                    <FormControl id="email" isRequired>
                                        <FormLabel>Email address</FormLabel>
                                        <Input type="email" />
                                    </FormControl>
                                    <FormControl id="password" isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                            <Input type={showPassword ? 'text' : 'password'} />
                                            <InputRightElement h={'full'}>
                                                <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <Stack spacing={10} pt={2}>
                                        <Button
                                            loadingText="Submitting"
                                            size="lg"
                                            bg={'teal.400'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'teal.500',
                                            }}
                                        >
                                            Sign up
                                        </Button>
                                    </Stack>
                                    <Stack pt={6}>
                                        <Text align={'center'}>
                                            Already a user? <Link color={'teal.400'}>Login</Link>
                                        </Text>
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
