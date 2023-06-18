import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { UseQueryResponse } from 'src/types/axios.type';
import { ITours } from 'src/types/tours.type';
import { authorizeOrder, changeStatusOrder } from 'src/utils/apis/order.api';
import { getDetailHostTours } from 'src/utils/apis/tours.api';

const useAuthorizeOrder = () => {
    const client = useQueryClient();
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();

    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: (data: { orderIdBlockChain: string; publicKey: string }) =>
            authorizeOrder(httpAuthJWT, data.orderIdBlockChain, data.publicKey),
        onSuccess: () => {
            // client.invalidateQueries(['GET_ALL_HOST_ORDER']);
        },
    });

    return {
        authorizeOrder: (data: { orderIdBlockChain: string; publicKey: string }) => {
            if (data) {
                return mutate(data);
            }
        },
        isLoading,
        isError,
        isSuccess,
    };
};

export default useAuthorizeOrder;
