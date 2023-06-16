import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectLayout = ({ children }: any): JSX.Element => {
    const router = useRouter();

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (isMobile) {
            router.push('/mobile');
        } 
    }, []);
  return <div>{ children}</div>;
};

export default RedirectLayout;
