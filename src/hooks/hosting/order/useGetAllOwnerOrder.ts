import { useQuery } from '@tanstack/react-query';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { getAllOwnerOrder } from 'src/utils/apis/order.api';

const useGetAllOwnerOrder = (pageParam: number, pageSize: number) => {
    const httpAuthJWT = useAxiosAuth();
    const { data, isLoading, isError, isSuccess } = useQuery(
        ['GET_ALL_OWNER_ORDER', pageParam, pageSize],
        () => getAllOwnerOrder(httpAuthJWT, pageSize, pageParam),
        { keepPreviousData: true },
    );

    return {
        data: data?.data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useGetAllOwnerOrder;
