import { useToast } from '@chakra-ui/react';
import { InfiniteData, QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { useAppSelector } from 'src/redux/hook';
import { selectCalendarHost } from 'src/redux/slice/calendarHostSlice';
import { IDayBook } from 'src/types/timeBooking.type';
import { patchDayTimeBook } from 'src/utils/apis/timeBooking.api';
const usePatchDayTimeBook = (
    tourId: number | undefined,
    refetch:
         (<TPageData>(
              options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
          ) => Promise<QueryObserverResult<InfiniteData<any>, unknown>>)
        | undefined,
) => {
    const client = useQueryClient();

    const { dateRange } = useAppSelector(selectCalendarHost);
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();
    const { data, isLoading, isError, isSuccess, mutate } = useMutation({
        mutationFn: (data: Omit<IDayBook[], 'tourId'>) => patchDayTimeBook(data, httpAuthJWT),
        onSuccess: ({ data }) => {
            client.invalidateQueries(['GET_ALL_DAYBOOKING_TOURS', tourId]);
            // client.invalidateQueries(['GET_ALL_TIME_BOOK_RANGE', tourId]);
            if (refetch) refetch();

            console.log(tourId, dateRange.startDate, dateRange.endDate);
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
