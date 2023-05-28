import { AxiosInstance } from 'axios';
import { IDayBook, IDayBookResponse, TimeBookViewDtoList } from 'src/types/timeBooking.type';
import {ITours } from 'src/types/tours.type';
import { http } from '../instance/http';

// export const deleteTours = async (tourId: number, axiosAuth: AxiosInstance) =>
//     await axiosAuth.delete<ITours>(`/tour/tour-delete/${tourId}`);

export const getAllDayTimeById = async (tourId: number, pageNo: number, pageSize: number) =>
    await http.get<IDayBookResponse>(`/day-booking/day-time/${tourId}`, {
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
        },
    });

export const patchDayBook = async (dayBook: Omit<IDayBook, 'timeBookViewDtoList'|'tourId'>, dayId: string, axiosAuth: AxiosInstance) =>
    await axiosAuth.patch<ITours>(`/day-booking/update/${dayId}`, dayBook);

export const getListTimeByDay = async (dayId: string) => await http.get<TimeBookViewDtoList[]>(`/time-book/list-time/${dayId}`);

export const patchTimeBook = async (timeBook: Omit<TimeBookViewDtoList, 'timeId'>, timeId: string, axiosAuth: AxiosInstance) =>
    await axiosAuth.patch<ITours>(`/time-booking/update/${timeId}`, timeBook);
