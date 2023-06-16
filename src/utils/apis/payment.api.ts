import { IDataPayment, IWallet } from 'src/types/payment.type';
import { AxiosInstance } from 'axios';
export const postPaymentTour = async (data: IDataPayment[], tourId: string, time_book_id: string, priceTotal: number, axiosAuth: AxiosInstance) =>
    await axiosAuth.post<any>(`/payment/${tourId}/${time_book_id}/${priceTotal}`, data, {
        params: {
            language:'vn',
        },
    });

export const postCreateWallet = async (data: IWallet, axiosAuth: AxiosInstance) => await axiosAuth.post<any>(`/wallet/create/`, data);


export const postUpdateWallet = async (data: Partial<IWallet>, axiosAuth: AxiosInstance) =>
    await axiosAuth.patch<any>(`/wallet/wallet-update/${data.walletId}`, data);

export const getWallet = async (axiosAuth: AxiosInstance) => await axiosAuth.get<any>(`/wallet/get-wallet/`);

