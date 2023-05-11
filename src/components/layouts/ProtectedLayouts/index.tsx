import { useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { JSXElementConstructor, ReactElement, ReactNode, useEffect } from 'react';
import { AppPropsWithLayout } from 'src/pages/_app';

type Props = {
    children: (page: ReactElement<any, string | JSXElementConstructor<any>>) => ReactNode;
};

/*
  add the requireAuth property to the page component
  to protect the page from unauthenticated users
  e.g.:
  OrderDetail.requireAuth = true;
  export default OrderDetail;
 */

export const ProtectedLayout = ({ children }: any): JSX.Element => {
    const router = useRouter();
    const { status: sessionStatus } = useSession();
    const authorized = sessionStatus === 'authenticated';
    const unAuthorized = sessionStatus === 'unauthenticated';
    const loading = sessionStatus === 'loading';
    const toast = useToast();
    useEffect(() => {
        // check if the session is loading or the router is not ready
        if (loading || !router.isReady) return;

        // if the user is not authorized, redirect to the login page
        // with a return url to the current page
        if (unAuthorized) {
            router.push({
              pathname: '/',
              query: { returnUrl: router.asPath },
            });
            toast({
                title: 'Lỗi',
                description: 'Bạn phải đăng nhập trước khi sử dụng tính năng này.',
                status: 'error',
                isClosable: true,
                variant: 'top-accent',
                position: 'top',
                containerStyle: {
                    padding: '2rem',
                },
                duration: 9000,
            });
        }
    }, [loading, unAuthorized, sessionStatus, router]);

    // if the user refreshed the page or somehow navigated to the protected page
    if (loading) {
        return <>Loading app...</>;
    }

    // if the user is authorized, render the page
    // otherwise, render nothing while the router redirects him to the login page
    return authorized ? <div>{children}</div> : <></>;
};
