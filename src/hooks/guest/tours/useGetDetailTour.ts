import { useQuery } from '@tanstack/react-query';
import { UseQueryResponse } from 'src/types/axios.type';
import { ITours } from 'src/types/tours.type';
import { getDetailTours } from 'src/utils/apis/tours.api';

const useGetDetailTour =  (tourId: string | string[] | undefined): UseQueryResponse<ITours> => {
    const { data, isLoading, isError, isSuccess } =  useQuery(['GET_DETAIL_TOURS', tourId], () => getDetailTours(tourId));

    return {
        data: data?.data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useGetDetailTour;
