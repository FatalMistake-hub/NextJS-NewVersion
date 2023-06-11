import { AxiosInstance } from 'axios';
import { IInfoAccount } from 'src/types/account.type';

export const getInfoAccount = async (axiosAuth: AxiosInstance) => await axiosAuth.get<IInfoAccount>('/profile/user-profile/');
export const patchInfoAccount = async (axiosAuth: AxiosInstance, data: Partial<IInfoAccount>) =>
    await axiosAuth.patch<IInfoAccount>('/profile/user-profile-update/', data);
