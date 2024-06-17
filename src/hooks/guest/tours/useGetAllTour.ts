'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { UseQueryInfinityResponse, UseQueryResponse } from 'src/types/axios.type';

import { getAllTours } from 'src/utils/apis/tours.api';

const useGetAllTour = (pageSize: number): UseQueryInfinityResponse<any> => {
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
    } = useInfiniteQuery(['GET_ALL_TOURS'], async ({ pageParam = 1 }) => await getAllTours(pageParam, pageSize), {
        getNextPageParam: (lastPage: any, allPages) => {
            if (lastPage.data.pageNo < lastPage.data.totalPages) {
                return lastPage.data.pageNo + 1;
            }
        },
        getPreviousPageParam: (firstPage: any, allPages) => {
            return firstPage.data.pageNo - 1;
        },
    });
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

export default useGetAllTour;
