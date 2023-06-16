import { useQuery } from '@tanstack/react-query';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { getAllGuestOrder } from 'src/utils/apis/order.api';

const useGetAllGuestOrder = ()  => {
    const httpAuthJWT = useAxiosAuth();

    const { data, isLoading, isError, isSuccess } = useQuery(['GET_ALL_ORDER'], () => getAllGuestOrder(httpAuthJWT));

    return {
        data: data?.data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useGetAllGuestOrder;
