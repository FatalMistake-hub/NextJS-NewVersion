import { GetPreviousPageParamFunction, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { UseQueryInfinityResponse, UseQueryResponse } from 'src/types/axios.type';
import { IAllTours } from 'src/types/tours.type';
import { getAllHostTours } from 'src/utils/apis/tours.api';

const useGetAllHostTour = (pageSize: number): UseQueryInfinityResponse<any> => {
    const { ref, inView } = useInView({ threshold: 0 });
    const httpJWT = useAxiosAuth();
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        isSuccess,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery(['GET_ALL_HOST_TOURS'], async ({ pageParam = 1 }) => await getAllHostTours(pageParam, pageSize, httpJWT), {
        getNextPageParam: (lastPage: any, allPages) => {
            if (lastPage.data.pageNo < lastPage.data.totalPages) {
                return lastPage.data.pageNo + 1;
            }
        },
        getPreviousPageParam: (firstPage: any, allPages) => {
            return firstPage.data.pageNo - 1;
        },
        retry: 2,
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
        isSuccess,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    };
};

export default useGetAllHostTour;
