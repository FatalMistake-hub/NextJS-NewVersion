import { AxiosInstance } from 'axios';
import { IStatisticOrder } from 'src/types/statistic.type';

export const getOrderStatistic = async (axiosAuth: AxiosInstance) => await axiosAuth.get<IStatisticOrder[]>('/statistic/make/');
