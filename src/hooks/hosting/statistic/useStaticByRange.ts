import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Dispatch } from 'react';
import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';
import { IStatisticOrder } from 'src/types/statistic.type';
import { getOrderStatisticByRange } from 'src/utils/apis/statistic.api';

const useStaticByRange = (setData: Dispatch<{ statisticResponse: IStatisticOrder[] }>) => {
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();

    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: (data: { end: string; start: string; type: 'ORDER' | 'VENUE' }) => getOrderStatisticByRange(httpAuthJWT, data),
        onSuccess: (data) => {
            setData(data?.data);
            console.log(data?.data.statisticResponse);
        },
    });

    return {
        getByRange: (data: { end: string; start: string; type: 'ORDER' | 'VENUE' }) => {
            console.log(data);
            if (data) {
                return mutate(data);
            }
        },
        isLoading,
        isError,
        isSuccess,
    };
};

export default useStaticByRange;
