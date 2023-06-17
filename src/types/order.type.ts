import { TimeBookViewDtoList } from './timeBooking.type';

export interface IOrder {
    orderId: string;
    orderDate: string;
    statusOrder: string;
    price: number;
    tour_title: string;
    city: string;
    imageMain: string;
    priceOnePerson: number;
    timeId: string;
    userId: string;
    orderIdBlockChain: string;
    publicKey: string;
    timeBookViewDto: TimeBookViewDtoList;
    date_name: string;
}
