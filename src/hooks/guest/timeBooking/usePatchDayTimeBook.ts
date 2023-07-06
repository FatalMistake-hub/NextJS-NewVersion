import { useToast } from '@chakra-ui/react';
import { InfiniteData, QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';

import { IDayBook } from 'src/types/timeBooking.type';
import { patchDayTimeBook } from 'src/utils/apis/timeBooking.api';
const usePatchDayTimeBook = (
    tourId: number | undefined,
    refetch:
        | (<TPageData>(
              options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
          ) => Promise<QueryObserverResult<InfiniteData<any>, unknown>>)
        | undefined,
) => {
    const client = useQueryClient();


    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();
    const { data, isLoading, isError, isSuccess, mutate } = useMutation({
        mutationFn: (data: Omit<IDayBook[], 'tourId'>) => patchDayTimeBook(data, httpAuthJWT),
        onSuccess: ({ data }) => {
            client.invalidateQueries(['GET_ALL_DAYBOOKING_TOURS', tourId]);
            if (refetch) refetch();
            toast({
                // title: 'Thành công.',
                description: 'Đã cập nhật tình trạng trải nghiệm.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'subtle',
                position: 'bottom-right',
            });
        },

        
    });

    return {
        mutateDayTime: async (DayTimeData: Omit<IDayBook[], 'tourId'>) => {
            return mutate(DayTimeData);
        },
        data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default usePatchDayTimeBook;
