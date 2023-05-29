import { getDetailTours } from 'src/utils/apis/tours.api';
export interface IDayBookResponse {
    content: IDayBook[];
}

export interface IDayBook {
    dayBookId: string;
    date_name: string;
    tourId: number;
    status: string;
    isDeleted: boolean;
    timeBookDetailList: TimeBookViewDtoList[];
}

export interface TimeBookViewDtoList {
    timeId: string;
    start_time: string;
    end_time: string;
    isDeleted: boolean;
}
