import { useQuery } from '@tanstack/react-query';
import { UseQueryResponse } from 'src/types/axios.type';
import { ITours } from 'src/types/tours.type';



// const useGetTimeBooking = (tourId: number| undefined): UseQueryResponse<any> => {
//     const { data, isLoading, isError, isSuccess } = useQuery(['GET_TIMEBOOKING_TOURS', tourId], () => getTimeBooking(tourId));

//     return {
//         data: data?.data,
//         isLoading,
//         isError,
//         isSuccess,
//     };
// };

// export default useGetTimeBooking;
