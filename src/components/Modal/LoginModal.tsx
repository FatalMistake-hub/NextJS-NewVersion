import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Flex,
    FormControl,
    FormLabel,
    Checkbox,
    Stack,
    Link,
    Heading,
} from '@chakra-ui/react';

import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { http } from 'src/utils/instance/http';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectAuth, SET_isLogin_TRUE } from 'src/redux/slice/authSlice';
interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { isLogin } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const Login = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Bắt buộc!')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập một địa chỉ email hợp lệ!'),
            password: Yup.string()
                .required('Bắt buộc!')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    'Mật khẩu phải có 7-19 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt!',
                ),
        }),
        onSubmit: async (values) => {
            const res = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (res?.status === 200) {
                onClose();
                dispatch(SET_isLogin_TRUE());
            }
        },
    });
    return (
        <Modal
            onClose={() => {
                onClose(), dispatch(SET_isLogin_TRUE());
            }}
            isOpen={isOpen || isLogin}
        >
            <ModalOverlay />
            <ModalContent>
                {/* <ModalHeader>
                    <Flex align={'center'} justify={'center'}>
                        Đăng nhập hoặc đăng ký
                    </Flex>
                </ModalHeader> */}
                <ModalCloseButton />
                <ModalBody>
                    <Flex align={'center'} justify={'center'}>
                        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                            <Stack align={'center'}>
                                <Heading lineHeight={1.4} fontSize={'4xl'}>
                                    Sign in to your account
                                </Heading>
                                <Text fontSize={'lg'} color={'gray.600'}>
                                    to enjoy all of our cool <Link color={'teal.400'}>features</Link> ✌️
                                </Text>
                            </Stack>

                            <form onSubmit={Login.handleSubmit}>
                                <Stack spacing={4}>
                                    <FormControl id="email">
                                        <FormLabel>Email address</FormLabel>
                                        <Input
                                            isInvalid={!!Login.errors.email}
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={Login.values.email}
                                            onChange={Login.handleChange}
                                        />
                                        {Login.errors.email && (
                                            <Text color={'red'} mt={2}>
                                                * {Login.errors.email}
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl id="password">
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            isInvalid={!!Login.errors.password}
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={Login.values.password}
                                            onChange={Login.handleChange}
                                        />
                                        {Login.errors.password && (
                                            <Text color={'red'} mt={2}>
                                                * {Login.errors.password}
                                            </Text>
                                        )}
                                    </FormControl>
                                    <Stack spacing={10}>
                                        <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                                            <Checkbox>Remember me</Checkbox>
                                            <Link color={'teal.400'}>Forgot password?</Link>
                                        </Stack>
                                        <Button
                                            type="submit"
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
                            </form>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
