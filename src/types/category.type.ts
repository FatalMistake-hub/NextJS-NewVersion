import { StringOptions } from 'sass';

export type IAllCategory = ICategory[];

export interface ICategory {
    categoryId?: number | undefined;
    categoryName?: string;
    label?: string;
}
