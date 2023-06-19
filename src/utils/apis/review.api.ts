import { AxiosInstance } from "axios";
import { http } from "../instance/http";
import { IReview } from "src/types/review.type";

export const getReviewByTour = async (tourId: number) => await http.get<IReview[]>(`/review/review-tour/${tourId}`);

export const patchUpdateReview = async (data: Partial<IReview>, reviewId: string, axiosAuth: AxiosInstance) =>
  await axiosAuth.patch<IReview>(`/review/update/${reviewId}`, data);
    

export const postCreateReview = async (data: Omit<IReview, 'reviewId' | 'userId'>, axiosAuth: AxiosInstance) =>
    await axiosAuth.post<IReview>(`/review/create/`, data);

// export const getListTimeByDay = async (dayId: string) => await http.get<TimeBookViewDtoList[]>(`/time-book/list-time/${dayId}`);
