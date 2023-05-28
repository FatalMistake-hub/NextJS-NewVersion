import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useAxiosAuth from 'src/hooks/auth/useAxiosAuth';

import { IImageTour, ImagePatch } from 'src/types/tours.type';
import { addImage, deleteImage, patchImage } from 'src/utils/apis/image.api';
const useMutateTourImg = (tourId: number | undefined) => {
    const client = useQueryClient();
    const httpAuthJWT = useAxiosAuth();
    const toast = useToast();
    const mutationAdd = useMutation({
        mutationFn: (data: Omit<ImagePatch,'imageId'>[]) => addImage(data, httpAuthJWT),
        onSuccess: ({ data }) => {
            client.invalidateQueries(['GET_DETAIL_TOURS', tourId]);
            toast({
                title: 'Thành công.',
                
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
    });
    const mutationDel = useMutation({
        mutationFn: (id: string) => deleteImage(id, httpAuthJWT),
        onSuccess: ({ data }) => {
            client.invalidateQueries(['GET_DETAIL_TOURS', tourId]);

            toast({
                title: 'Thành công.',
                
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
    });
    const mutationUpdate = useMutation({
        mutationFn: (data: IImageTour) => patchImage(data, httpAuthJWT),
        onSuccess: ({ data }) => {
            client.invalidateQueries(['GET_DETAIL_TOURS', tourId]);

            toast({
                title: 'Thành công.',
                
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
    });

    return {
        mutationAdd,
        mutationDel,
        mutationUpdate,
    };
};

export default useMutateTourImg;
