import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IInfoAccount } from 'src/types/account.type';
import { patchInfoAccount } from 'src/utils/apis/account.api';

import useAxiosAuth from '../auth/useAxiosAuth';

const usePatchProfile = () => {
    const client = useQueryClient();

    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();
    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: (data: Partial<IInfoAccount>) => patchInfoAccount(httpAuthJWT, data),
        onSuccess: ({ data }) => {
            client.invalidateQueries({queryKey: ['GET_DETAIL_PROFILE']});
            toast({
                title: 'Thành công',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
    });

    return {
        patchInfoAccount: (data: Partial<IInfoAccount>) => {
            if (data) {
                return mutate(data);
            }
        },
        isPending,
        isError,
        isSuccess,
    };
};

export default usePatchProfile;
