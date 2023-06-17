import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { IOrder } from 'src/types/order.type';
import { IAllTours, ITours } from 'src/types/tours.type';

import { getAllHostTours } from 'src/utils/apis/tours.api';

const useGetAllHostingOrder = (pageParam: number, pageSize: number, selectedStatus: string) => {
    const httpAuthJWT = useAxiosAuth();

    const filterData = useCallback(
        (allTour) => {
            const filteredOrders = allTour.data.content.flatMap((item: ITours) => {
                return item.orderDtoList?.filter((order: IOrder) => !selectedStatus || order.statusOrder === selectedStatus);
            });

            return filteredOrders.sort((a: IOrder, b: IOrder) => {
                const dateA = new Date(a.orderDate);
                const dateB = new Date(b.orderDate);

                return dateB.getTime() - dateA.getTime();
            });
        },
        [selectedStatus],
    );

    const {
        data: allTour = [],
        isLoading,
        isError,
        isSuccess,
    } = useQuery(['GET_ALL_HOST_ORDER', pageParam, pageSize], () => getAllHostTours(pageParam, pageSize, httpAuthJWT), {
        select: filterData,
    });

    return {
        data: allTour,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useGetAllHostingOrder;
