import { AxiosInstance } from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { httpAuth } from 'src/utils/instance/http';
import { useRefreshToken } from './useRefreshToken';

const useAxiosAuth = (): AxiosInstance => {
    const { data: session, status } = useSession();
    const refreshToken = useRefreshToken();
    const requestInterceptorRef = useRef<number | null>(null);
    const responseInterceptorRef = useRef<number | null>(null);

    useEffect(() => {
        if (status === 'loading') {
            return;
        }

        const requestIntercept = httpAuth.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${session?.user?.token}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = httpAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    await refreshToken();
                    prevRequest.headers['Authorization'] = `Bearer ${session?.user?.token}`;
                    return httpAuth(prevRequest);
                }
                return Promise.reject(error);
            },
        );

        requestInterceptorRef.current = requestIntercept;
        responseInterceptorRef.current = responseIntercept;

        return () => {
            if (requestInterceptorRef.current) {
                httpAuth.interceptors.request.eject(requestInterceptorRef.current);
            }
            if (responseInterceptorRef.current) {
                httpAuth.interceptors.response.eject(responseInterceptorRef.current);
            }
        };
    }, [session, refreshToken, status]);

    return httpAuth;
};

export default useAxiosAuth;
