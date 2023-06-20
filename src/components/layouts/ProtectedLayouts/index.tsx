import { useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { JSXElementConstructor, ReactElement, ReactNode, useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hook';
import { SET_isLogin_FALSE } from 'src/redux/slice/authSlice';

export const ProtectedLayout = ({ children }: any): JSX.Element => {
    const router = useRouter();
    const { status: sessionStatus, data: session } = useSession();
    const authorized = sessionStatus === 'authenticated';
    const unAuthorized = sessionStatus === 'unauthenticated';
    const loading = sessionStatus === 'loading';
    const toast = useToast();
    const dispatch = useAppDispatch();
    useEffect(() => {
        // check if the session is loading or the router is not ready
        if (loading || !router.isReady) return;

        // if the user is not authorized, redirect to the login page
        // with a return url to the current page
        if (unAuthorized && router.pathname !== '/payment') {
            const isMobile = window.matchMedia('(max-width: 768px)').matches;

            if (isMobile) {
                // router.push('/mobile');
                !session?.user ? router.push('/mobile') : router.push('/mobile/listings');
            } else {
                router.push({
                    pathname: '/',
                    query: { returnUrl: router.asPath },
                });
            }
            toast({
                title: 'Cảnh báo!',
                description: 'Bạn phải đăng nhập trước khi sử dụng tính năng này.',
                status: 'warning',
                isClosable: true,
                variant: 'top-accent',
                position: 'top',
                containerStyle: {
                    padding: '2rem',
                },
                duration: 3000,
            });
            dispatch(SET_isLogin_FALSE());
        } else if (unAuthorized && router.pathname === '/payment') {
            router.back();
            dispatch(SET_isLogin_FALSE());
        }
        return () => {};
    }, [loading, unAuthorized, sessionStatus, router]);

    // if the user refreshed the page or somehow navigated to the protected page
    if (loading) {
        return <>Loading app...</>;
    }

    // if the user is authorized, render the page
    // otherwise, render nothing while the router redirects him to the login page
    return authorized ? <div>{children}</div> : <></>;
};
