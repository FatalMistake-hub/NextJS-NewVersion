import { IDataPayment, IPayment } from 'src/types/payment.type';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Router, useRouter } from 'next/navigation';
import { useAppDispatch } from 'src/redux/hook';
import { becomeHostInitState } from 'src/redux/initState/becomeHostInitState';
import { SET_INITSTATE } from 'src/redux/slice/becomeHostSlice';
import { ITours, TourPost } from 'src/types/tours.type';
import useAxiosAuth from '../../auth/useAxiosAuth';
import { postPaymentTour } from 'src/utils/apis/payment.api';

const usePostPaymentTour = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: (payment: IPayment) =>
            postPaymentTour(payment.data, payment.tourId, payment.time_book_id, Number(payment.priceTotal), httpAuthJWT),
        onSuccess: (res) => {
            console.log(res?.data.data);
            window.location.href = res?.data.data.payment.paymentUrl;
        },
        onError: (error: any) => {
            if (error.response.status !== 401) {
                toast({
                    title: 'Account created.',
                    description: `${error}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        },
        onMutate: (data: IPayment) => {
            
        },
    });

    return {
        postPaymentTour: (payment: IPayment) => {
            if (payment) {
                return mutate(payment);
            }
        },
        isLoading,
        isError,
        isSuccess,
    };
};

export default usePostPaymentTour;
