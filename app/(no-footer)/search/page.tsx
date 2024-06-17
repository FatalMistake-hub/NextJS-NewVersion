import FilterNav from '@components/Filter/FilterNav';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import useTourBySearch from 'src/hooks/guest/tours/useGetTourBySearch';
import { formatGuests } from 'src/utils/guestsUtil';
import Search from './_component';
import { getAllCategory } from 'src/utils/apis/category.api';

export default async function SearchMain() {
    const { payload: data } = await getAllCategory();
    const dataCategory = data?.map((item: any) => ({
        type: 'Button',
        id: item.categoryId,
        label: item.categoryName,
        imageLink: item.imageLink,
    }));
    return (
        <div className="pt-[76px] min-h-screen">
            <div className=" w-full   overflow-x-clip fixed top-[76px]  flex justify-center pr-10 bg-white z-10 border border-b-gray-700 py-3">
                <FilterNav dataCategory={ dataCategory } />
            </div>
            <Search />
        </div>
    );
}
