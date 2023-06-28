import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Router, useRouter } from 'next/router';
import { useAppDispatch } from 'src/redux/hook';
import { becomeHostInitState } from 'src/redux/initState/becomeHostInitState';
import { SET_INITSTATE } from 'src/redux/slice/becomeHostSlice';
import { ITours, TourPost } from 'src/types/tours.type';
import { postTours } from 'src/utils/apis/tours.api';
import useAxiosAuth from '../../auth/useAxiosAuth';

const useCreateTour = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: (tours: TourPost) => postTours(tours, httpAuthJWT),
        onSuccess: ({ data }) => {
            router.push(`/hosting`);
            dispatch(SET_INITSTATE(becomeHostInitState));
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
        onMutate: (tours: TourPost) => {
            // toast({
            //     title: 'Trải nghiệm đang được tạo.',
            //     description: `Vui lòng đợi trong giây lát.`,
            //     status: 'info',
            //     duration: 3000,
            //     isClosable: true,
            //     position: 'top',
            // });
        },
    });

    return {
        postTours: (tours: TourPost) => {
            if (tours) {
                return mutate(tours);
            }
        },
        isLoadingPost: isLoading,
        isError,
        isSuccess,
    };
};

export default useCreateTour;
