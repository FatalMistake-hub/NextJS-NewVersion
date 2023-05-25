import { useToast } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { http } from 'src/utils/instance/http';

export const useRefreshToken = () => {
    const { data: session } = useSession();
const toast = useToast();
    const refreshToken = async () => {
        const res = await http.post('/refreshToken', {
            refresh: session?.user.refreshToken,
        });

        if (session) session.user.token = res.data.token;
        else {
            toast({
                title: 'Phiên đăng nhập đã hết hạn.',
                description: `Vui lòng đăng nhập lại.`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            signOut();
        }
    };
    return refreshToken;
};
