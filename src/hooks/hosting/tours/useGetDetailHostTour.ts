import { useQuery } from '@tanstack/react-query';
import { UseQueryResponse } from 'src/types/axios.type';
import { ITours } from 'src/types/tours.type';
import { getDetailHostTours } from 'src/utils/apis/tours.api';

const useGetDetailHostTour = (tourId: number|undefined): UseQueryResponse<ITours> => {
    const { data, isLoading, isError, isSuccess } = useQuery(['GET_DETAIL_TOURS', tourId], () => getDetailHostTours(tourId));

    return {
        data: data?.data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useGetDetailHostTour;
