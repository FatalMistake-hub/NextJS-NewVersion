import { getAllCategory } from 'src/utils/apis/category.api';
import CategoryItem from './CategoryItem';

export default async function Category () {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const { payload: data } = await getAllCategory();
    const dataCategory = data?.map((item: any) => ({
        type: 'Button',
        id: item.categoryId,
        label: item.categoryName,
        imageLink: item.imageLink,
    }));
    return (
        <div
            // slidesPerView={5}
            // // spaceBetween={2}

            // pagination={{ clickable: true }}
            // modules={[Pagination]}
            style={{ padding: '16px 48px 0px 48px', borderRadius: '0.75rem' }}
            className="min-h-[300px] max-w-[1816px]  bg-transparent    "
        >
            {dataCategory?.map((item: any, index: number) => (
                <CategoryItem item={item} index={index} />
            ))}
        </div>
    );
};
