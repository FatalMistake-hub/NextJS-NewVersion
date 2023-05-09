import { IAllTours, ITours } from 'src/types/tours.type';
import { http } from '../instance/http';

export const getAllTours = async (pageNo: number, pageSize: number) =>
    await http.get<IAllTours>('/tour/all', {
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
        },
    });
export const getDetailTours = async (index: string | string[] | undefined) => await http.get<ITours>(`/tour/tour-detail/${index}`);
