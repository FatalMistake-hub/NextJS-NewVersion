
import { useQuery } from '@tanstack/react-query';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { UseQueryResponse } from 'src/types/axios.type';
import { IAllTours } from 'src/types/tours.type';
import { getAllHostTours } from 'src/utils/apis/tours.api';


const useGetAllHostTour = (): UseQueryResponse<IAllTours> => {
  const httpJWT = useAxiosAuth();
    const { data, isLoading, isError, isSuccess } = useQuery(['GET_HOST_TOURS'], () => getAllHostTours(httpJWT));

    return {
        data: data?.data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useGetAllHostTour;

