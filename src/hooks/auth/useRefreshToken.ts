
import { signIn, useSession } from 'next-auth/react';
import { http } from 'src/utils/instance/http';

export const useRefreshToken = () => {
    const { data: session } = useSession();

    const refreshToken = async () => {
        const res = await http.post('/refreshToken', {
            refresh: session?.user.refreshToken,
        });

        if (session) session.user.token = res.data.token;
        else signIn();
    };
    return refreshToken;
};
