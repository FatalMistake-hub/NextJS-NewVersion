import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import useAxiosAuth from '../../auth/useAxiosAuth';
import { IWallet } from 'src/types/payment.type';
import { getWallet, postCreateWallet, postUpdateWallet } from 'src/utils/apis/payment.api';
import { useSession } from 'next-auth/react';

const useWallet = () => {
    const client = useQueryClient();
    const router = useRouter();
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();
    const { data: session, status } = useSession();
    const useCreateWallet = useMutation({
        mutationFn: async (wallet: IWallet) => await postCreateWallet(wallet, httpAuthJWT),
        onSuccess: ({ data }) => {
            client.invalidateQueries({ queryKey: ['GET_WALLET'] });
        },
        onError: (error: any) => {
            if (error.response.status !== 401) {
                toast({
                    title: 'Account created.',
                    description: `${error}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        },
    });
    const useUpdateWallet = useMutation({
        mutationFn: (wallet: IWallet) => postUpdateWallet(wallet, httpAuthJWT),
        onSuccess: ({ data }) => {
            client.invalidateQueries({ queryKey: ['GET_WALLET'] });
        },
        onError: (error: any) => {
            if (error.response.status !== 401) {
                toast({
                    title: 'Account created.',
                    description: `${error}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        },
    });

    const useGetWallet = useQuery({
        queryKey: ['GET_WALLET'],
        queryFn: () => getWallet(httpAuthJWT),
        enabled: !!session?.user.isWallet,
    });

    return {
        useGetWallet,
        useCreateWallet,
        useUpdateWallet,
    };
};

export default useWallet;
