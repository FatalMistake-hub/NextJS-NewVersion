import { AxiosInstance } from "axios";
import { IOrder } from "src/types/order.type";

export const getAllGuestOrder = async (axiosAuth: AxiosInstance) => await axiosAuth.get<IOrder[]>(`/order/all/`);
export const changeStatusOrder = async (axiosAuth: AxiosInstance,orderId:string,status:string) => await axiosAuth.get<any>(`/order/create-request/${orderId}/${status}`);
