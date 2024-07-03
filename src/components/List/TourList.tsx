'use client';
import { Box, Button, chakra, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import CardItem, { CardItemSkeleton } from '@components/Card/CardItem';
import { FC } from 'react';
import useGetAllTour from 'src/hooks/guest/tours/useGetAllTour';
import { ITours } from 'src/types/tours.type';
import { features } from 'src/utils/dataElement';

export const TourList: FC = () => {
    const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetAllTour(10);
    return (
        <>
            <div className="max-w-[1640px] relative top-24 w-full pt-10 pb-24">
                <Heading lineHeight={1.4} as="h2" size="lg" w={'full'} textAlign={'center'} noOfLines={1} pt={12} mb={14}>
                    Vì sao bạn nên chọn NATravel
                </Heading>
                <SimpleGrid minChildWidth={'304px'} spacing={16} pb={8}>
                    {features.map((feature: any, index: any) => (
                        <Box key={index} className="flex flex-col justify-left items-center" textAlign={'center'}>
                            <div className="drop-shadow-lg pb-3"> {feature.icon}</div>
                            <chakra.h3 fontWeight="semibold" fontSize="2xl">
                                {feature.heading}
                            </chakra.h3>
                            <Text fontSize="md" fontWeight={500}>
                                {feature.content}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
                <Heading lineHeight={1.4} as="h2" size="lg" noOfLines={1} py={8}>
                    Tất cả trải nghiệm
                </Heading>

                {status === 'loading' ? (
                    <SimpleGrid minChildWidth={'304px'} columnGap="4" pb={12}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <CardItemSkeleton key={index} />
                        ))}
                    </SimpleGrid>
                ) : status === 'error' ? (
                    <span>Error: {error?.message}</span>
                ) : (
                    <>
                        <SimpleGrid minChildWidth={'304px'} gap="6" pb={12}>
                            {data?.pages?.map((page: any) =>
                                page?.data?.content?.map(
                                    (result: ITours) =>
                                        result.isDeleted === false && (
                                            <CardItem className="h-full min-h-[450px]" data={result} key={result.tourId} />
                                        ),
                                ),
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
                    p={2}
                    w={'120px'}
                    className="my-8 bg-black"
                >
                    {isFetchingNextPage ? 'Đang tải...' : 'Tải thêm'}
                </Button>
            )}
        </>
    );
};
