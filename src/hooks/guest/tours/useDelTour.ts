import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTours } from 'src/utils/apis/tours.api';

import useAxiosAuth from '../../auth/useAxiosAuth';

const useDelTour = () => {
    const client = useQueryClient();

    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: (tourId: number) => deleteTours(tourId, httpAuthJWT),
        onSuccess: ({ data }) => {
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
        deleteTours: (tourId: number) => {
            if (tourId) {
                return mutate(tourId);
            }
        },
        isLoading,
        isError,
        isSuccess,
    };
};

export default useDelTour;
