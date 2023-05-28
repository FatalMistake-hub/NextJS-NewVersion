import { useQuery } from '@tanstack/react-query';
import { UseQueryResponse } from 'src/types/axios.type';
import { IDayBook } from 'src/types/timeBooking.type';
import { getAllDayTimeById } from 'src/utils/apis/timeBooking.api';


const useGetAllDayBookingById = (tourId: number): UseQueryResponse<IDayBook[]> => {
    const { data, isLoading, isError, isSuccess } = useQuery(['GET_ALL_DAYBOOKING_TOURS', tourId], async() => await getAllDayTimeById(tourId));

    return {
        data: data?.data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useGetAllDayBookingById;
