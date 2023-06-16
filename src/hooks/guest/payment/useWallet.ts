import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Router, useRouter } from 'next/router';
import { useAppDispatch } from 'src/redux/hook';
import { becomeHostInitState } from 'src/redux/initState/becomeHostInitState';
import { SET_INITSTATE } from 'src/redux/slice/becomeHostSlice';
import { ITours, TourPost } from 'src/types/tours.type';
import { postTours } from 'src/utils/apis/tours.api';
import useAxiosAuth from '../../auth/useAxiosAuth';
import { IWallet } from 'src/types/payment.type';
import { getWallet, postCreateWallet, postUpdateWallet } from 'src/utils/apis/payment.api';
import { useSession } from 'next-auth/react';

const useWallet = () => {
    const router = useRouter();
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();
    const { data: session, status } = useSession();
    const useCreateWallet = useMutation({
        mutationFn: async (wallet: IWallet) => await postCreateWallet(wallet, httpAuthJWT),
        onSuccess: ({ data }) => {},
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
        onSuccess: ({ data }) => {},
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

    const useGetWallet = useQuery(['GET_WALLET'], () => getWallet(httpAuthJWT), {
        enabled: session?.user.isWallet,
    });

    return {
        useGetWallet,
        useCreateWallet,
        useUpdateWallet,
    };
};

export default useWallet;
