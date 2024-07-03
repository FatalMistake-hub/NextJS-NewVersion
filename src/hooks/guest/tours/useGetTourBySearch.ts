import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from 'src/redux/hook';
import { selectSearch } from 'src/redux/slice/searchSlice';
import { UseQueryInfinityResponse } from 'src/types/axios.type';
import { getToursBySearch } from 'src/utils/apis/tours.api';

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
    } = useInfiniteQuery({
        queryKey: [
            'GET_ALL_TOURS_BY_SEARCH',
            categoryList,
            viewport.northEastLatitude,
            viewport.northEastLongtitude,
            viewport.southWestLatitude,
            viewport.southWestLongtitude,
        ],
        queryFn: async ({ pageParam }) =>
            await getToursBySearch(categoryList, pageParam, pageSize, {
                northEastLat: viewport.northEastLatitude,
                northEastLng: viewport.northEastLongtitude,
                southWestLat: viewport.southWestLatitude,
                southWestLng: viewport.southWestLongtitude,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage: any, allPages) => {
            if (lastPage.data.pageNo < lastPage.data.totalPages) {
                return lastPage.data.pageNo + 1;
            }
        },
        getPreviousPageParam: (firstPage: any, allPages) => {
            return firstPage.data.pageNo - 1;
        },
        enabled: !!categoryList,
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

export default useTourBySearch;
