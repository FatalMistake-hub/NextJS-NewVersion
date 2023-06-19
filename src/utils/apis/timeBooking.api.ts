import { AxiosInstance } from 'axios';
import { IDayBook, IDayBookResponse, TimeBookViewDtoList } from 'src/types/timeBooking.type';
import { ITours, IViewPort } from 'src/types/tours.type';
import { http } from '../instance/http';

// export const deleteTours = async (tourId: number, axiosAuth: AxiosInstance) =>
//     await axiosAuth.delete<ITours>(`/tour/tour-delete/${tourId}`);

export const getAllTimeByRange = async (
    start_time: string,
    end_time: string,
    pageNo: number,
    pageSize: number,
    tourId: string | string[] | undefined,

) =>
    await http.get<IDayBookResponse>(`/day-booking/day-time/${tourId}/${start_time}/${end_time}`, {
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
        },
    });

export const getAllDayTimeById = async (tourId: number) => await http.get<IDayBook[]>(`/day-booking/day/all/${tourId}`);

export const patchDayBook = async (dayBook: Omit<IDayBook, 'timeBookDetailList' | 'tourId'>, dayId: string, axiosAuth: AxiosInstance) =>
    await axiosAuth.patch<ITours>(`/day-booking/update/${dayId}`, dayBook);

export const getListTimeByDay = async (dayId: string) => await http.get<TimeBookViewDtoList[]>(`/time-book/list-time/${dayId}`);

export const patchTimeBook = async (timeBook: Omit<TimeBookViewDtoList, 'timeId'>, timeId: string, axiosAuth: AxiosInstance) =>
    await axiosAuth.patch<ITours>(`/time-booking/update/${timeId}`, timeBook);

export const patchDayTimeBook = async (DayTimeBook: Omit<IDayBook[], 'tourId'>, axiosAuth: AxiosInstance) =>
    await axiosAuth.patch<IDayBookResponse>(`/day-booking/update-day-time/`, DayTimeBook);

