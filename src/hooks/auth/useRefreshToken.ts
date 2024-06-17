'use client'
import { useToast } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useAppDispatch } from 'src/redux/hook';
import { SET_isLogin_FALSE } from 'src/redux/slice/authSlice';
import { http } from 'src/utils/instance/http';

export const useRefreshToken = () => {
    const { data: session, status } = useSession();
    const toast = useToast();
    // const router = useRouter();
    const refreshTokenCalledRef = useRef(false);
    const dispatch = useAppDispatch();
    const refreshToken = async () => {
        try {
            // if (!refreshTokenCalledRef.current) {
            //     refreshTokenCalledRef.current = true;
            //     return;
            // }

            // if (status === 'loading') {
            //     return;
            // }

            if (session && session.user && session.user.refreshToken) {
                const res = await http.post('/auth/refresh_token/', {
                    refreshToken: session.user.refreshToken,
                });

                session.user.token = res.data.accessToken;
                session.user.refreshToken = res.data.refreshToken;
            } else {
                // await toast({
                //     title: 'Bạn chưa đăng nhập.',
                //     description: 'Vui lòng đăng nhập.',
                //     status: 'warning',
                //     duration: 3000,
                //     isClosable: true,
                //     position: 'top',
                // });
                // await router.push('/');
                // await signIn();
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401
                || error.response.status === 500
            ) {
                await toast({
                    title: 'Phiên đăng nhập đã hết hạn.',
                    description: 'Vui lòng đăng nhập lại.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
                await signOut({
                    redirect: false,
                    //  callbackUrl: '/'
                });
                dispatch(SET_isLogin_FALSE());
                // await router.push('/');
            }
        }
    };

    return refreshToken;
};
