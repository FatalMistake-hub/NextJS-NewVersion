import MainLayout from '@components/layouts/MainLayout';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import { Box, Button, Center, Flex, Heading, Image, Link, SimpleGrid, Spacer, Text, useTheme } from '@chakra-ui/react';
import CardItem, { CardItemSkeleton } from '@components/Card/CardItem';

import useGetAllTour from 'src/hooks/guest/tours/useGetAllTour';
import { ITours } from 'src/types/tours.type';
import FilterNav from '@components/Filter/FilterNav';
import { GetServerSideProps } from 'next';
import useGetAllCatgory from 'src/hooks/guest/category/useGetAllCategory';
import { getCategory, getSearch } from 'src/utils/data';
import { getAllCategory } from 'src/utils/apis/category.api';
interface Props {
    dataCategory: any;
}
const Home = ({ dataCategory }: Props) => {
    const {
        status,
        ref,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useGetAllTour(10);
    const theme = useTheme();

    return (
        <>
            <Flex display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={'80px'}>
                <div className="max-w-[1800px] w-full  mx-auto overflow-x-clip pt-10  flex justify-center pr-10">
                    <FilterNav dataCategory={dataCategory} />
                </div>

                <div className="w-full pt-10">
                    <Heading lineHeight={1.4} as="h2" size="lg" noOfLines={1}>
                        Tất cả trải nghiệm
                    </Heading>

                    {status === 'loading' ? (
                        <SimpleGrid minChildWidth={'300px'} gap="12" py={12}>
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                        </SimpleGrid>
                    ) : status === 'error' ? (
                        <span>Error: {error?.message}</span>
                    ) : (
                        <>
                            {/* <div>
                                <button onClick={() => fetchPreviousPage()} disabled={!hasPreviousPage || isFetchingPreviousPage}>
                                    {isFetchingPreviousPage ? 'Loading more...' : hasPreviousPage ? 'Load Older' : 'Nothing more to load'}
                                </button>
                            </div> */}
                            <SimpleGrid minChildWidth={'300px'} gap="4">
                                {data?.pages?.map((page: any) =>
                                    page?.data?.content?.map((result: ITours) => <CardItem className="h-[590px]" data={result} />),
                                )}
                            </SimpleGrid>
                        </>
                    )}
                </div>
                {hasNextPage && (
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                        isLoading={isFetchingNextPage}
                        // ref={ref}
                        colorScheme="black"
                        color={'white'}
                        p={6}
                        className="my-8 bg-black"
                    >
                        {isFetchingNextPage ? 'Đang tải...' : hasNextPage ? 'Tải thêm' : 'Tải thêm'}
                    </Button>
                )}
            </Flex>
        </>
    );
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const { data } = await getAllCategory();
    const dataCategory = data?.map((item) => ({ type: 'Button', id: item.categoryId, label: item.categoryName }));
    return {
        props: { dataCategory },
    };
};
export default Home;
