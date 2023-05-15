import { AxiosInstance } from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { httpAuth } from 'src/utils/instance/http';
import { useRefreshToken } from './useRefreshToken';

const useAxiosAuth = (): AxiosInstance => {
    const { data: session } = useSession();
    const refreshToken = useRefreshToken();

    useEffect(() => {
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
                    prevRequest.headers['Authorization'] = `Bearer ${session?.user.token}`;
                    return httpAuth(prevRequest);
                }
                return Promise.reject(error);
            },
        );

        return () => {
            httpAuth.interceptors.request.eject(requestIntercept);
            httpAuth.interceptors.response.eject(responseIntercept);
        };
    }, [session, refreshToken]);

    return httpAuth;
};

export default useAxiosAuth;
