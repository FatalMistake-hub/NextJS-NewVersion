import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { UseQueryResponse } from 'src/types/axios.type';
import { IOrder } from 'src/types/order.type';
import { ITours } from 'src/types/tours.type';
import { changeStatusOrder, patchUpdateOrder } from 'src/utils/apis/order.api';
import { getDetailHostTours } from 'src/utils/apis/tours.api';

const useUpdateOrder = () => {
    const client = useQueryClient();
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();

    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: (data: Partial<IOrder>) =>
            patchUpdateOrder(httpAuthJWT, data.orderId, { orderIdBlockChain: data.orderIdBlockChain, publicKey: data.publicKey }),
        onSuccess: () => {
            client.invalidateQueries(['GET_ALL_HOST_ORDER']);
            toast({
                title: 'SUCCESSFULLY ADDED A LISTING',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
    });

    return {
        updateOrder: (data: Partial<IOrder>) => {
            if (data) {
                return mutate(data);
            }
        },
        isLoading,
        isError,
        isSuccess,
    };
};

export default useUpdateOrder;
