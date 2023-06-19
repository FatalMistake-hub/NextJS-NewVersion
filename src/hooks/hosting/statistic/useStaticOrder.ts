import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { IOrder } from 'src/types/order.type';
import { IAllTours, ITours } from 'src/types/tours.type';
import { getOrderStatistic } from 'src/utils/apis/statistic.api';

import { getAllHostTours } from 'src/utils/apis/tours.api';

const useOrderStatistic = () => {
    const httpAuthJWT = useAxiosAuth();


    const {
        data,
        isLoading,
        isError,
        isSuccess,
    } = useQuery(['GET_STATISTIC_ORDER'], () => getOrderStatistic( httpAuthJWT));

    return {
        data: data?.data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useOrderStatistic;
