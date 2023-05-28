import { AxiosInstance } from 'axios';
import { IImageTour, ImagePatch } from 'src/types/tours.type';

// const httpJWT= useAxiosAuth()

export const patchImage = async (data: IImageTour, axiosAuth: AxiosInstance) =>
    await axiosAuth.patch<ImagePatch[]>(`/image/image-update/${data.imageId}`);
export const deleteImage = async (id: string, axiosAuth: AxiosInstance) => await axiosAuth.delete<ImagePatch>(`/image/image-delete/${id}`);
export const addImage = async (data: Omit<ImagePatch, 'imageId'>[], axiosAuth: AxiosInstance) =>
    await axiosAuth.post<ImagePatch[]>(`/image/create/`, data);
