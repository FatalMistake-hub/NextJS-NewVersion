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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useRegister from 'src/hooks/auth/useRegister';
interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, isLoading } = useRegister();
    const Register = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
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
            name: Yup.string()
                .required('Bắt buộc!')
                .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'Không sử dụng kí tự đặc biệt.')
                .matches(/^([a-zA-Z0-9_-]){4,20}$/gms, 'Nhập tên từ 4-20 kí tự.'),
            confirmPassword: Yup.string()
                .required('Bắt buộc!')
                .oneOf([Yup.ref('password')], 'Mật khẩu nhập lại không trùng khớp!'),
        }),
        onSubmit: async (values) => {
            await register({
                userEmail: values.email,
                userPassword: values.password,
                matchingPassword: values.confirmPassword,
                userName: values.name,
            });
          
        },
    });
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                {/* <ModalHeader>Sign up</ModalHeader> */}
                <ModalCloseButton />
                <ModalBody>
                    <Flex align={'center'} justify={'center'} bg={useColorModeValue('white.50', 'white.800')}>
                        <Stack spacing={8} mx={'auto'} w={'full'} py={6} px={6}>
                            <Stack align={'center'}>
                                <Heading lineHeight={1.4} fontSize={'4xl'} textAlign={'center'}>
                                    Sign up
                                </Heading>
                                <Text fontSize={'lg'} color={'gray.600'}>
                                    to enjoy all of our cool features ✌️
                                </Text>
                            </Stack>

                            <form onSubmit={Register.handleSubmit}>
                                <Stack spacing={4}>
                                    <FormControl id="userName" isRequired>
                                        <FormLabel>User Name</FormLabel>
                                        <Input
                                            isInvalid={!!Register.errors.name}
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={Register.values.name}
                                            onChange={Register.handleChange}
                                        />
                                        {Register.errors.name && (
                                            <Text color={'red'} mt={2}>
                                                * {Register.errors.name}
                                            </Text>
                                        )}
                                    </FormControl>

                                    <FormControl id="email" isRequired>
                                        <FormLabel>Email address</FormLabel>
                                        <Input
                                            isInvalid={!!Register.errors.email}
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={Register.values.email}
                                            onChange={Register.handleChange}
                                        />
                                        {Register.errors.email && (
                                            <Text color={'red'} mt={2}>
                                                * {Register.errors.email}
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl id="password" isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                            <Input
                                                isInvalid={!!Register.errors.password}
                                                id="password"
                                                name="password"
                                                value={Register.values.password}
                                                onChange={Register.handleChange}
                                                type={showPassword ? 'text' : 'password'}
                                            />
                                            <InputRightElement h={'full'}>
                                                <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        {Register.errors.password && (
                                            <Text color={'red'} mt={2}>
                                                * {Register.errors.password}
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl id="confirmPassword" isRequired>
                                        <FormLabel>ConfirmPassword</FormLabel>
                                        <InputGroup>
                                            <Input
                                                isInvalid={!!Register.errors.confirmPassword}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={Register.values.confirmPassword}
                                                onChange={Register.handleChange}
                                                type={showConfirmPassword ? 'text' : 'password'}
                                            />
                                            <InputRightElement h={'full'}>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        {Register.errors.confirmPassword && (
                                            <Text color={'red'} mt={2}>
                                                * {Register.errors.confirmPassword}
                                            </Text>
                                        )}
                                    </FormControl>

                                    <Stack spacing={10} pt={2}>
                                        <Button
                                            type="submit"
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
                                            Already a user? <Link color={'teal.400'}>Register</Link>
                                        </Text>
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
