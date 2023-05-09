export interface ITours {
    tourId: number;
    title: string;
    rating: number;
    city: string;
    priceOnePerson: number;
    imageMain: string;
    working: string;
    latitude: string;
    longitude: string;
    destination: string;
    destinationDescription: string;
    categoryId: number;
    categoryName: string;
    avgRating: number;
    userId: string;
}
export interface IAllTours {
    content: ITours[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}
