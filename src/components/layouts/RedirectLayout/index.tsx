import React, { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const RedirectLayout = ({ children }: any): JSX.Element => {
    const router = useRouter();
    const { data: session, status } = useSession();
    useLayoutEffect(() => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (isMobile) {
            // router.push('/mobile');
            !session?.user ? router.push('/mobile') : router.push('/mobile/listings');
        }
    }, []);
    return <div>{children}</div>;
};

export default RedirectLayout;
