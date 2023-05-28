import { GetPreviousPageParamFunction, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { UseQueryInfinityResponse, UseQueryResponse } from 'src/types/axios.type';
import { getAllTimeByRange } from 'src/utils/apis/timeBooking.api';

import { getAllTours } from 'src/utils/apis/tours.api';

const useGetAllTimeBookingByRange = (
    start_time: string,
    end_time: string,
    pageSize: number,
    tourId: string | string[] | undefined,
): UseQueryInfinityResponse<any> => {
    const { ref, inView } = useInView({ threshold: 0 });

    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery(
        ['GET_ALL_TIME_BOOK_RANGE'],
        async ({ pageParam = 1 }) => await getAllTimeByRange(start_time, end_time, pageParam, pageSize, tourId),
        {
            getNextPageParam: (lastPage: any, allPages) => {
                if (lastPage.data.pageNo < lastPage.data.totalPages) {
                    return lastPage.data.pageNo + 1;
                }
            },
            getPreviousPageParam: (firstPage: any, allPages) => {
                return firstPage.data.pageNo - 1;
            },
        },
    );
    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);
    return {
        status,
        ref,
        data: data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    };
};

export default useGetAllTimeBookingByRange;
