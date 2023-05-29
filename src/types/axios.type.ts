import { FetchNextPageOptions, FetchPreviousPageOptions, InfiniteData, InfiniteQueryObserverResult, QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';

export interface UseQueryResponse<T> {
    data?: T;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
}
export interface UseQueryInfinityResponse<T> {
    data?: T;
    error: any;
    isFetching: boolean;
    isSuccess?: boolean;
    isFetchingNextPage: boolean;
    isFetchingPreviousPage: boolean;
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<any, unknown>>;
    fetchPreviousPage: (options?: FetchPreviousPageOptions | undefined) => Promise<InfiniteQueryObserverResult<any, unknown>>;
    refetch?: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    ) => Promise<QueryObserverResult<InfiniteData<any>, unknown>>;
    hasNextPage: boolean | undefined;
    hasPreviousPage: boolean | undefined;
    status: string;
    ref?: any;
}
