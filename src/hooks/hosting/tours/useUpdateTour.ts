import { patchToursFrameTime } from './../../../utils/apis/tours.api';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Router, useRouter } from 'next/router';
import { useAppDispatch } from 'src/redux/hook';
import { becomeHostInitState } from 'src/redux/initState/becomeHostInitState';
import { SET_INITSTATE } from 'src/redux/slice/becomeHostSlice';
import { ITours, TourPost } from 'src/types/tours.type';
import { patchTours } from 'src/utils/apis/tours.api';
import useAxiosAuth from '../../auth/useAxiosAuth';

const usePatchTour = (tourId: number | undefined) => {
    const client = useQueryClient();

    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: (tours: Partial<ITours>) => patchTours(tours, tourId, httpAuthJWT),
        onSuccess: ({ data }) => {
            client.invalidateQueries(['GET_DETAIL_TOURS', tourId]);
            client.invalidateQueries(['GET_ALL_HOST_TOURS']);
            toast({
                title: 'Thành công',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
    });
    const updateTourTime = useMutation({
        mutationFn: (tours: Partial<ITours>) => patchToursFrameTime(tours, tourId, httpAuthJWT),
        onSuccess: ({ data }) => {
            client.invalidateQueries(['GET_DETAIL_TOURS', tourId]);
            client.invalidateQueries(['GET_ALL_HOST_TOURS']);
            toast({
                title: 'Thành công',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
    });
    return {
        patchTours: (tours: Partial<ITours>) => {
            if (tours) {
                return mutate(tours);
            }
        },
        updateTourTime,
        patchToursFrameTime: (tours: Partial<ITours>) => {
            if (tours) {
                return updateTourTime.mutate(tours);
            }
        },
        isLoadingPost: isLoading,
        isError,
        isSuccess,
    };
};

export default usePatchTour;
