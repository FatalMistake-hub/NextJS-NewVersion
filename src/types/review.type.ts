import { IInfoAccount } from './account.type';

export interface IReview {
    comment: string;
    rating: number;
    reviewId: string;
    tourId: number;
    userId: string;
    user: IInfoAccount;
}
