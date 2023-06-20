import { Button, Checkbox, FormControl, Text, FormLabel, Input, Link, Stack, RadioGroup, Radio } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Login } from 'src/utils/apis/auths.api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { useAppDispatch } from 'src/redux/hook';
import { SET_ROLE_LOGIN, SET_isLogin_TRUE } from 'src/redux/slice/authSlice';
import { useState } from 'react';
import useLogin from 'src/hooks/auth/useLogin';
const Mobile = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [role, setRole] = useState('HOST');
    const { login } = useLogin();
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
                dispatch(SET_ROLE_LOGIN(role));
                 dispatch(SET_isLogin_TRUE());
                // router.push('/mobile/listings');
                if (role === 'GUEST') {
                    router.push('/mobile/listings');
                } else {
                    router.push('/mobile/indentity/host');
                }
            }
            await login(values);
        },
    });
    return (
        <div className="">
            <div className="text-center">
                <img className="rounded-full" alt="profile pic" src="https://i.ibb.co/4mWnBWV/AREmoji-20220303-153534-12754.png" />

                <p className="py-4 text-lg font-medium">Xác thực trải nghiệm</p>
            </div>
            <form onSubmit={Login.handleSubmit}>
                <Stack spacing={4}>
                    <FormControl id="email">
                        <FormLabel>Địa chỉ email</FormLabel>
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
                        <FormLabel>Mật khẩu</FormLabel>
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
                    <FormLabel>Đăng nhâp với vai trò :</FormLabel>
                    <Stack spacing={10}>
                        {/* <Stack direction={{ base: 'row', sm: 'row' }} align={'start'} justify={'space-between'}>
                            <RadioGroup
                                defaultValue={role}
                                onChange={(value) => {
                                    setRole(value);
                                }}
                            >
                                <Stack spacing={5} direction="row">
                                    <Radio colorScheme="teal" value="HOST">
                                        Chủ tour
                                    </Radio>
                                    <Radio colorScheme="teal" value="GUEST">
                                        Người tham gia tour
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </Stack> */}
                        <Button
                            type="submit"
                            bg={'teal.400'}
                            color={'white'}
                            _hover={{
                                bg: 'teal.500',
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </div>
    );
};

export default Mobile;
Mobile.Layout = 'MobileLayout';
