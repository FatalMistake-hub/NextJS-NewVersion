import { useQuery } from '@tanstack/react-query';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { UseQueryResponse } from 'src/types/axios.type';
import { ITours } from 'src/types/tours.type';
import { changeStatusOrder } from 'src/utils/apis/order.api';
import { getDetailHostTours } from 'src/utils/apis/tours.api';

const useChangeStatusOrder = (orderId:string,statusId:string) => {
    const httpAuthJWT = useAxiosAuth();

    const { data, isLoading, isError, isSuccess } = useQuery(['CHANGE_STATUS_ORDER'], () =>
        changeStatusOrder(httpAuthJWT,orderId, statusId),
    );

    return {
        data: data?.data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useChangeStatusOrder;
