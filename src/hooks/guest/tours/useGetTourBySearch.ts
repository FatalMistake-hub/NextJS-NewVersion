import { GetPreviousPageParamFunction, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from 'src/redux/hook';
import { UseQueryInfinityResponse, UseQueryResponse } from 'src/types/axios.type';
import { IAllTours } from 'src/types/tours.type';
import { getToursBySearch } from 'src/utils/apis/tours.api';
import { selectSearch } from 'src/redux/slice/searchSlice';

const useTourBySearch = (pageSize: number, viewport: any): UseQueryInfinityResponse<any> => {
    const { ref, inView } = useInView({ threshold: 0 });
    const { categoryList } = useAppSelector(selectSearch);

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
        [
            'GET_ALL_TOURS_BY_SEARCH',
            categoryList,
            viewport.northEastLatitude,
            viewport.northEastLongtitude,
            viewport.southWestLatitude,
            viewport.southWestLongtitude,
        ],
        async ({ pageParam = 1 }) =>
            await getToursBySearch(categoryList, pageParam, pageSize, {
                northEastLat: viewport.northEastLatitude,
                northEastLng: viewport.northEastLongtitude,
                southWestLat: viewport.southWestLatitude,
                southWestLng: viewport.southWestLongtitude,
            }),
        {
            getNextPageParam: (lastPage: any, allPages) => {
                if (lastPage.data.pageNo < lastPage.data.totalPages) {
                    return lastPage.data.pageNo + 1;
                }
            },
            getPreviousPageParam: (firstPage: any, allPages) => {
                return firstPage.data.pageNo - 1;
            },
            enabled: !!categoryList,
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

export default useTourBySearch;
