import { AxiosInstance } from 'axios';
import { ICategory } from 'src/types/category.type';
import { IAllTours, ITours, TourPost } from 'src/types/tours.type';
import { http } from '../instance/http';
// const httpJWT= useAxiosAuth()
export const getToursBySearch = async (category: ICategory, pageNo: number, pageSize: number) =>
    await http.get<IAllTours>(`/tour/${category.label}`, {
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
        },
    });
export const getAllTours = async (pageNo: number, pageSize: number) =>
    await http.get<IAllTours>('/tour/all', {
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
        },
    });

export const getDetailTours = async (index: string | string[] | undefined) => await http.get<ITours>(`/tour/tour-detail/${index}`);

export const getDetailHostTours = async (index: number | undefined) => await http.get<ITours>(`/tour/tour-detail/${index}`);

export const postTours = async (tours: TourPost, axiosAuth: AxiosInstance) => await axiosAuth.post<ITours>(`/tour/create/`, tours);

export const patchTours = async (tours: Partial<ITours>, tourId: number | undefined, axiosAuth: AxiosInstance) =>
    await axiosAuth.patch<ITours>(`/tour/tour-update/${tourId}`, tours);
export const patchToursFrameTime = async (tours: Partial<ITours>, tourId: number | undefined, axiosAuth: AxiosInstance) =>
    await axiosAuth.patch<ITours>(`/tour/tour-update-time/${tourId}`, tours);

export const deleteTours = async (tourId: number, axiosAuth: AxiosInstance) =>
    await axiosAuth.delete<ITours>(`/tour/tour-delete/${tourId}`);

export const getAllHostTours = async (pageNo: number, pageSize: number, axiosAuth: AxiosInstance) =>
    await axiosAuth.get<IAllTours>('/tour/tour-owner/', {
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
        },
    });
