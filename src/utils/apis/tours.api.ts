import { AxiosInstance } from 'axios';
import { IAllTours, ITours, TourPost } from 'src/types/tours.type';
import { http } from '../instance/http';
// const httpJWT= useAxiosAuth()
export const getAllTours = async (pageNo: number, pageSize: number) =>
    await http.get<IAllTours>('/tour/all', {
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
        },
    });
export const getDetailTours = async (index: string | string[] | undefined) => await http.get<ITours>(`/tour/tour-detail/${index}`);
export const postTours = async (tours: TourPost, axiosAuth: AxiosInstance) => await axiosAuth.post<ITours>(`/tour/create/`, tours);
export const getAllHostTours = async (axiosAuth: AxiosInstance) => await axiosAuth.get<IAllTours>('/tour/all');
