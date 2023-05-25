import { http } from '../instance/http';
// const httpJWT= useAxiosAuth()
export const getTimeBooking = async (tourId: number, pageNo: number, pageSize: number) =>
    await http.get<any>('/tour/all', {
        params: {
            tourId: tourId,
            pageNo: pageNo,
            pageSize: pageSize,
        },
    });
export const getDetailTours = async (index: string | string[] | undefined) => await http.get<any>(`/tour/tour-detail/${index}`);
