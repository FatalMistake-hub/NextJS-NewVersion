import { useQuery } from '@tanstack/react-query';
import { UseQueryResponse } from 'src/types/axios.type';
import { ITours } from 'src/types/tours.type';
import { getInfoAccount } from 'src/utils/apis/account.api';
import useAxiosAuth from '../auth/useAxiosAuth';

const useProfile = () => {
    const httpJWT = useAxiosAuth();
    const { data, isLoading, isError, isSuccess } = useQuery({ queryKey: ['GET_DETAIL_PROFILE'], queryFn: () => getInfoAccount(httpJWT) });

    return {
        data: data?.data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useProfile;
