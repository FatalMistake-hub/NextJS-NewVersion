
import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { UseQueryResponse } from 'src/types/axios.type';
import { ITours } from 'src/types/tours.type';
import { changeStatusOrder } from 'src/utils/apis/order.api';
import { getDetailHostTours } from 'src/utils/apis/tours.api';

const useChangeStatusOrder = () => {
    const client = useQueryClient();
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();

    const { mutateAsync, isLoading, isError, isSuccess } = useMutation({
        mutationFn: (status: { orderId: string; status: string }) => changeStatusOrder(httpAuthJWT, status.orderId, status.status),
        onSuccess: () => {
            client.invalidateQueries(['GET_ALL_OWNER_ORDER']);
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
        changeStatus: (status: { orderId: string; status: string }) => {
            if (status) {
                return mutateAsync(status);
            }
        },
        isLoading,
        isError,
        isSuccess,
    };
};

export default useChangeStatusOrder;
