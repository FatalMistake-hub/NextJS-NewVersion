export interface IDataPayment {
    guestType: string;
    quantity: number;
}
export interface IPayment {
    data: IDataPayment[];
    tourId: string;
    time_book_id: string;
    priceTotal: number;
}

export interface IWallet {
    accountNumber: string;
    totalMoney: number;
    walletId?: string;
    bankName: string;
}
