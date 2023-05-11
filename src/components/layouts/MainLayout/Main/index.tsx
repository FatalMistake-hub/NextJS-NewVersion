import { Box, Button, Center, Flex, Heading, Image, Link, SimpleGrid, Spacer, Text, useTheme } from '@chakra-ui/react';
import CardItem from '@components/Card/CardItem';
import FilterNav from '@components/Filter/FilterNav';

import React from 'react';
import useGetAllTour from 'src/hooks/tours/useGetAllTour';
import { ITours } from 'src/types/tours.type';

const Main: React.FC = () => {
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
    console.log(hasNextPage);
    return (
        <>
            <Flex display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={'80px'}>
                <div className="max-w-[1800px] w-full  mx-auto overflow-x-clip pt-10  flex">
                    <FilterNav />
                </div>

                <div className="w-full pt-10">
                    <Heading as="h2" size="lg" noOfLines={1}>
                        Tất cả trải nghiệm
                    </Heading>

                    {status === 'loading' ? (
                        <p>Loading...</p>
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
                    {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load new' : 'Nothing more to load'}
                </Button>
            </Flex>
        </>
    );
};
export default Main;
