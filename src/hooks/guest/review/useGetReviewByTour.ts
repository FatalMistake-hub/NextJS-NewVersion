import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import useAxiosAuth from '../../auth/useAxiosAuth';

import { getWallet } from 'src/utils/apis/payment.api';
import { getReviewByTour } from 'src/utils/apis/review.api';

const useGetReviewByTour = (tourId: number) => {
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();

    const { data, isSuccess, isLoading, isError } = useQuery(['GET_REVIEW_BY_TOURID', tourId], () => getReviewByTour(tourId), {
        enabled: !!tourId,
    });

    return {
        data: data?.data,
        isSuccess,
        isLoading,
        isError,
    };
};

export default useGetReviewByTour;
