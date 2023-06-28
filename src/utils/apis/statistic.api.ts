import { AxiosInstance } from 'axios';
import { IStatisticOrder } from 'src/types/statistic.type';

export const getOrderStatistic = async (axiosAuth: AxiosInstance) => await axiosAuth.get<IStatisticOrder[]>('/statistic/make/');
export const getOrderStatisticByRange = async (
    axiosAuth: AxiosInstance,
    data: {
        end: string;
        start: string;
        type: 'ORDER' | 'VENUE';
    },
) => await axiosAuth.post < {statisticResponse: IStatisticOrder[]} >(`/statistic/venue/day/${data.type}`, { end: data.end, start: data.start });
