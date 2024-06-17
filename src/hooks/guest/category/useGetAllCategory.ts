import { useQuery } from '@tanstack/react-query';
import { UseQueryResponse } from 'src/types/axios.type';
import { IAllCategory } from 'src/types/category.type';
import { getAllCategory } from 'src/utils/apis/category.api';

const useGetAllCatgory = (): UseQueryResponse<IAllCategory> => {
    const { data, isLoading, isError, isSuccess } = useQuery(['GET_ALL_CATEGORY'], async () => await getAllCategory());

    return {
        data: data?.payload,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useGetAllCatgory;
