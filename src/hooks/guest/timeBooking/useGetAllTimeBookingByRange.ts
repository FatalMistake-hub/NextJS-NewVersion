import { GetPreviousPageParamFunction, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { UseQueryInfinityResponse, UseQueryResponse } from 'src/types/axios.type';
import { IDayBookResponse } from 'src/types/timeBooking.type';
import { getAllTimeByRange } from 'src/utils/apis/timeBooking.api';

import { getAllTours } from 'src/utils/apis/tours.api';

const useGetAllTimeBookingByRange = (
    start_time: string,
    end_time: string,
    pageSize: number,
    tourId: string | string[] | undefined,
    setRes: Dispatch<SetStateAction<IDayBookResponse | undefined>>,
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
        refetch,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery(
        ['GET_ALL_TIME_BOOK_RANGE', tourId, start_time, end_time],
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
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                setRes(res.pages[0].data);
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
        refetch,
        hasPreviousPage,
    };
};

export default useGetAllTimeBookingByRange;
