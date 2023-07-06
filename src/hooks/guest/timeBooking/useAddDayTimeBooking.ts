import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useAxiosAuth from '../../auth/useAxiosAuth';
import { addDayTimeBooking } from 'src/utils/apis/timeBooking.api';
import { TimeBookViewDtoList } from 'src/types/timeBooking.type';

const useAddDayTimeBooking = (tourId: string, start_time: string, end_time: string) => {
    const httpAuthJWT = useAxiosAuth();
    const client = useQueryClient();
    const toast = useToast();
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: (DayTimeBook: Omit<TimeBookViewDtoList, 'timeId' | 'isDeleted'>) => addDayTimeBooking(DayTimeBook, tourId, httpAuthJWT),
        onSuccess: ({ data }) => {
            client.invalidateQueries(['GET_ALL_DAYBOOKING_TOURS', Number(tourId)]);
            client.invalidateQueries(['GET_ALL_TIME_BOOK_RANGE', tourId, start_time, end_time, 1000]);
            toast({
                title: 'Thêm thành công',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'subtle',
                position: 'bottom-right',
            });
        },
        onError: (error: any) => {
            if (error.response.status !== 401) {
                toast({
                    
                    description: `${error}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    variant: 'subtle',
                    position: 'bottom-right',
                });
            }
        },
    });
    return {
        addDayTimeBooking: (DayTimeBook: Omit<TimeBookViewDtoList, 'timeId' | 'isDeleted'>) => {
            if (DayTimeBook) {
                return mutate(DayTimeBook);
            }
        },
        isLoadingPost: isLoading,
        isError,
        isSuccess,
    };
};

export default useAddDayTimeBooking;
