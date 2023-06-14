export type IAllCategory = ICategory[];

export interface ICategory {
    categoryId?: number | undefined;
    categoryName?: string;
    label?: string;
    imageLink?: string;
}
