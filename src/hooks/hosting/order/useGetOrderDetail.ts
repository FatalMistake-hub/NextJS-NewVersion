import { useQuery } from '@tanstack/react-query';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { getDetailGuestOrder } from 'src/utils/apis/order.api';

const useGetDetailGuestOrder = (orderId: string) => {
    const httpAuthJWT = useAxiosAuth();

    const { data, isLoading, isError, isSuccess } = useQuery(
        ['GET_DETAIL_GUEST_ORDER', orderId],
        () => getDetailGuestOrder(httpAuthJWT, orderId),
        {
            enabled: !!orderId,
        },
    );

    return {
        data: data?.data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useGetDetailGuestOrder;
