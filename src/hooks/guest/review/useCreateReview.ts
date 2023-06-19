import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';

import useAxiosAuth from '../../auth/useAxiosAuth';
import { IWallet } from 'src/types/payment.type';
import { postCreateWallet } from 'src/utils/apis/payment.api';
import { postCreateReview } from 'src/utils/apis/review.api';
import { IReview } from 'src/types/review.type';

const useCreateReview = () => {
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();

    const { mutateAsync, isSuccess, isLoading, isError } = useMutation({
        mutationFn: async (data: Omit<IReview, 'reviewId' | 'userId' | 'user'>) => await postCreateReview(data, httpAuthJWT),
        onSuccess: ({ data }) => {
            toast({
                title: 'Đăng thành công',
                description: `Đánh giá của bạn đã được lưu lại.`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
        onError: (error: any) => {
            toast({
                title: 'Lỗi',
                description: `${error}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        },
    });

    return {
        mutateReview: async (data: Omit<IReview, 'reviewId' | 'userId' | 'user'>) => {
            return mutateAsync(data);
        },
        isSuccess,
        isLoading,
        isError,
    };
};

export default useCreateReview;
